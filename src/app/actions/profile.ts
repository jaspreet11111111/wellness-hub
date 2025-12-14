'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: {
    fullName: string
    phone?: string
}) {
    const supabase = createClient()

    if (!supabase) {
        return { error: 'Supabase not configured' }
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const { error } = await supabase
        .from('profiles')
        .update({
            full_name: formData.fullName,
            phone: formData.phone || null,
        })
        .eq('id', user.id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/profile')
    revalidatePath('/dashboard')

    return { success: true }
}
