'use server'

import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/types'

type ClassType = Database['public']['Tables']['class_types']['Row']
type ClassSession = Database['public']['Tables']['class_sessions']['Row']

export async function getClassTypes(): Promise<ClassType[]> {
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
        console.error('Error fetching class types:', error)
        return []
    }

    return data || []
}

export async function getUpcomingClassSessions(): Promise<(ClassSession & { class_type: ClassType })[]> {
    const supabase = createClient()

    if (!supabase) {
        return []
    }

    const today = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
        .from('class_sessions')
        .select(`
      *,
      class_type:class_types(*)
    `)
        .eq('status', 'scheduled')
        .gte('date', today)
        .order('date')
        .order('time')

    if (error) {
        console.error('Error fetching class sessions:', error)
        return []
    }

    return data as any || []
}
