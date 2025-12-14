'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// ==================== CLASS TYPES ====================

export async function createClassType(formData: FormData) {
    const supabase = createClient()

    if (!supabase) {
        return { error: 'Supabase not configured' }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Not authenticated' }
    }

    // Check admin status
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized - Admin access required' }
    }

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const duration = parseInt(formData.get('duration') as string)
    const price = parseFloat(formData.get('price') as string)
    const difficulty_level = formData.get('difficulty_level') as string
    const image_url = formData.get('image_url') as string
    const instructor = formData.get('instructor') as string
    const benefits = (formData.get('benefits') as string).split('\n').filter(b => b.trim())
    const what_to_bring = formData.get('what_to_bring') as string

    try {
        const { data, error } = await supabase
            .from('class_types')
            .insert({
                name,
                description,
                duration,
                price,
                difficulty_level,
                image_url,
                instructor,
                benefits,
                what_to_bring,
                active: true
            })
            .select()
            .single()

        if (error) throw error

        revalidatePath('/admin/classes')
        revalidatePath('/schedule')
        return { success: true, data }
    } catch (error: any) {
        console.error('Create class type error:', error)
        return { error: error.message }
    }
}

export async function updateClassType(id: string, formData: FormData) {
    const supabase = createClient()

    if (!supabase) {
        return { error: 'Supabase not configured' }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Not authenticated' }
    }

    // Check admin status
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized - Admin access required' }
    }

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const duration = parseInt(formData.get('duration') as string)
    const price = parseFloat(formData.get('price') as string)
    const difficulty_level = formData.get('difficulty_level') as string
    const image_url = formData.get('image_url') as string
    const instructor = formData.get('instructor') as string
    const benefits = (formData.get('benefits') as string).split('\n').filter(b => b.trim())
    const what_to_bring = formData.get('what_to_bring') as string

    try {
        const { data, error } = await supabase
            .from('class_types')
            .update({
                name,
                description,
                duration,
                price,
                difficulty_level,
                image_url,
                instructor,
                benefits,
                what_to_bring
            })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        revalidatePath('/admin/classes')
        revalidatePath('/schedule')
        return { success: true, data }
    } catch (error: any) {
        console.error('Update class type error:', error)
        return { error: error.message }
    }
}

export async function deleteClassType(id: string) {
    const supabase = createClient()

    if (!supabase) {
        return { error: 'Supabase not configured' }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Not authenticated' }
    }

    // Check admin status
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized - Admin access required' }
    }

    try {
        const { error } = await supabase
            .from('class_types')
            .delete()
            .eq('id', id)

        if (error) throw error

        revalidatePath('/admin/classes')
        revalidatePath('/schedule')
        return { success: true }
    } catch (error: any) {
        console.error('Delete class type error:', error)
        return { error: error.message }
    }
}

export async function getAllClassTypes() {
    const supabase = createClient()

    if (!supabase) {
        return []
    }

    const { data, error } = await supabase
        .from('class_types')
        .select('*')
        .eq('active', true)
        .order('name')

    if (error) {
        console.error('Get class types error:', error)
        return []
    }

    return data || []
}

// ==================== CLASS SESSIONS ====================

export async function createClassSession(formData: FormData) {
    const supabase = createClient()

    if (!supabase) {
        return { error: 'Supabase not configured' }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Not authenticated' }
    }

    // Check admin status
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized - Admin access required' }
    }

    const class_type_id = formData.get('class_type_id') as string
    const date = formData.get('date') as string
    const time = formData.get('time') as string
    const location = formData.get('location') as string
    const instructor_override = formData.get('instructor_override') as string
    const max_capacity = parseInt(formData.get('max_capacity') as string)

    try {
        const { data, error } = await supabase
            .from('class_sessions')
            .insert({
                class_type_id,
                date,
                time,
                location,
                instructor_override: instructor_override || null,
                max_capacity,
                booked_count: 0
            })
            .select(`
                *,
                class_type:class_types(*)
            `)
            .single()

        if (error) throw error

        revalidatePath('/admin/classes')
        revalidatePath('/schedule')
        return { success: true, data }
    } catch (error: any) {
        console.error('Create class session error:', error)
        return { error: error.message }
    }
}

export async function updateClassSession(id: string, formData: FormData) {
    const supabase = createClient()

    if (!supabase) {
        return { error: 'Supabase not configured' }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Not authenticated' }
    }

    // Check admin status
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized - Admin access required' }
    }

    const class_type_id = formData.get('class_type_id') as string
    const date = formData.get('date') as string
    const time = formData.get('time') as string
    const location = formData.get('location') as string
    const instructor_override = formData.get('instructor_override') as string
    const max_capacity = parseInt(formData.get('max_capacity') as string)

    try {
        const { data, error } = await supabase
            .from('class_sessions')
            .update({
                class_type_id,
                date,
                time,
                location,
                instructor_override: instructor_override || null,
                max_capacity
            })
            .eq('id', id)
            .select(`
                *,
                class_type:class_types(*)
            `)
            .single()

        if (error) throw error

        revalidatePath('/admin/classes')
        revalidatePath('/schedule')
        return { success: true, data }
    } catch (error: any) {
        console.error('Update class session error:', error)
        return { error: error.message }
    }
}

export async function deleteClassSession(id: string) {
    const supabase = createClient()

    if (!supabase) {
        return { error: 'Supabase not configured' }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Not authenticated' }
    }

    // Check admin status
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized - Admin access required' }
    }

    try {
        const { error } = await supabase
            .from('class_sessions')
            .delete()
            .eq('id', id)

        if (error) throw error

        revalidatePath('/admin/classes')
        revalidatePath('/schedule')
        return { success: true }
    } catch (error: any) {
        console.error('Delete class session error:', error)
        return { error: error.message }
    }
}

export async function getAllClassSessions() {
    const supabase = createClient()

    if (!supabase) {
        return []
    }

    const { data, error } = await supabase
        .from('class_sessions')
        .select(`
            *,
            class_type:class_types(*)
        `)
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date')
        .order('time')

    if (error) {
        console.error('Get class sessions error:', error)
        return []
    }

    return data || []
}
