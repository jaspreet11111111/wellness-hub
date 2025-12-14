'use server'

import { createClient } from '@/lib/supabase/server'

export async function getPackages() {
    const supabase = createClient()

    if (!supabase) {
        return []
    }

    const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('active', true)
        .order('credits', { ascending: true })

    if (error) {
        console.error('Error fetching packages:', error)
        return []
    }

    return data || []
}
