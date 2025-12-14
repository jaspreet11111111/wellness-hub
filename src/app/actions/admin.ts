'use server'

import { createClient } from '@/lib/supabase/server'

export async function getAllBookings() {
    const supabase = createClient()

    if (!supabase) return []

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return []
    }

    const { data, error } = await supabase
        .from('bookings')
        .select(`
      *,
      user:profiles(full_name, email),
      class_session:class_sessions(
        *,
        class_type:class_types(*)
      )
    `)
        .order('created_at', { ascending: false })
        .limit(100)

    if (error) {
        console.error('Error fetching bookings:', error)
        return []
    }

    return data || []
}

export async function getAllUsers() {
    const supabase = createClient()

    if (!supabase) return []

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return []
    }

    // Get all profiles including email
    const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    if (profilesError) {
        console.error('Error fetching users:', profilesError)
        return []
    }

    return profiles || []
}

export async function createClassSession(formData: {
    classTypeId: string
    date: string
    time: string
    duration: number
    maxCapacity: number
    location: string
}) {
    const supabase = createClient()

    if (!supabase) {
        return { error: 'Supabase not configured' }
    }

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized - admin access required' }
    }

    const { data, error } = await supabase
        .from('class_sessions')
        .insert({
            class_type_id: formData.classTypeId,
            date: formData.date,
            time: formData.time,
            duration: formData.duration,
            max_capacity: formData.maxCapacity,
            location: formData.location,
            status: 'scheduled',
        })
        .select()
        .single()

    if (error) {
        return { error: error.message }
    }

    return { success: true, data }
}
