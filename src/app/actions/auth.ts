'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
    const supabase = createClient()

    if (!supabase) {
        return { error: 'Supabase not configured. Please set up environment variables.' }
    }

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signUp(formData: FormData) {
    const supabase = createClient()

    if (!supabase) {
        return { error: 'Supabase not configured' }
    }

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                email: email // Store email in user metadata too
            },
        },
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/auth/verify-email')
}

export async function signOut() {
    const supabase = createClient()

    if (!supabase) {
        redirect('/')
    }

    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}

export async function resetPassword(formData: FormData) {
    const supabase = createClient()

    if (!supabase) {
        return { error: 'Supabase not configured. Please set up environment variables.' }
    }

    const email = formData.get('email') as string

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/update-password`,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}

// Alias for backwards compatibility
export const logout = signOut

