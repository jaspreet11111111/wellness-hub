'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function bookClass(sessionId: string) {
    const supabase = createClient()

    if (!supabase) {
        return { error: 'Supabase not configured' }
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        return { error: 'You must be logged in to book a class' }
    }

    // Check if user has credits or needs to pay
    const { data: profile } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', user.id)
        .single()

    if (!profile || profile.credits < 1) {
        return { error: 'Insufficient credits. Please purchase a package first.' }
    }

    // Create booking
    const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
            user_id: user.id,
            class_session_id: sessionId,
            status: 'confirmed'
        })
        .select()
        .single()

    if (bookingError) {
        if (bookingError.code === '23505') { // Unique constraint violation
            return { error: 'You have already booked this class' }
        }
        return { error: bookingError.message }
    }

    // Deduct credit
    await supabase
        .from('profiles')
        .update({ credits: profile.credits - 1 })
        .eq('id', user.id)

    revalidatePath('/dashboard')
    revalidatePath('/schedule')

    return { success: true, booking }
}

export async function cancelBooking(bookingId: string) {
    const supabase = createClient()

    if (!supabase) {
        return { error: 'Supabase not configured' }
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'You must be logged in' }
    }

    // Get booking details
    const { data: booking } = await supabase
        .from('bookings')
        .select('*, class_session:class_sessions(date, time)')
        .eq('id', bookingId)
        .eq('user_id', user.id)
        .single()

    if (!booking) {
        return { error: 'Booking not found' }
    }

    // Check if cancellation is allowed (24h before class)
    const classDateTime = new Date(`${booking.class_session.date}T${booking.class_session.time}`)
    const now = new Date()
    const hoursUntilClass = (classDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (hoursUntilClass < 24) {
        return { error: 'Cannot cancel within 24 hours of class start time' }
    }

    // Cancel booking
    const { error } = await supabase
        .from('bookings')
        .update({
            status: 'cancelled',
            cancelled_at: new Date().toISOString()
        })
        .eq('id', bookingId)

    if (error) {
        return { error: error.message }
    }

    // Refund credit
    const { data: profile } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', user.id)
        .single()

    if (profile) {
        await supabase
            .from('profiles')
            .update({ credits: profile.credits + 1 })
            .eq('id', user.id)
    }

    revalidatePath('/dashboard')

    return { success: true }
}

export async function getUserBookings() {
    const supabase = createClient()

    if (!supabase) {
        return []
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return []
    }

    const { data, error } = await supabase
        .from('bookings')
        .select(`
      *,
      class_session:class_sessions(
        *,
        class_type:class_types(*)
      )
    `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching bookings:', error)
        return []
    }

    return data || []
}
