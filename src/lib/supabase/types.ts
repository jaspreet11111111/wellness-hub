export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    full_name: string
                    phone: string | null
                    profile_image_url: string | null
                    credits: number
                    role: 'client' | 'admin'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    full_name: string
                    phone?: string | null
                    profile_image_url?: string | null
                    credits?: number
                    role?: 'client' | 'admin'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    full_name?: string
                    phone?: string | null
                    profile_image_url?: string | null
                    credits?: number
                    role?: 'client' | 'admin'
                    created_at?: string
                    updated_at?: string
                }
            }
            class_types: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                    duration: number
                    price: number
                    difficulty_level: 'beginner' | 'intermediate' | 'advanced' | null
                    image_url: string | null
                    active: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    description?: string | null
                    duration: number
                    price: number
                    difficulty_level?: 'beginner' | 'intermediate' | 'advanced' | null
                    image_url?: string | null
                    active?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    description?: string | null
                    duration?: number
                    price?: number
                    difficulty_level?: 'beginner' | 'intermediate' | 'advanced' | null
                    image_url?: string | null
                    active?: boolean
                    created_at?: string
                }
            }
            class_sessions: {
                Row: {
                    id: string
                    class_type_id: string
                    date: string
                    time: string
                    duration: number
                    max_capacity: number
                    booked_count: number
                    location: string | null
                    status: 'scheduled' | 'cancelled'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    class_type_id: string
                    date: string
                    time: string
                    duration: number
                    max_capacity?: number
                    booked_count?: number
                    location?: string | null
                    status?: 'scheduled' | 'cancelled'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    class_type_id?: string
                    date?: string
                    time?: string
                    duration?: number
                    max_capacity?: number
                    booked_count?: number
                    location?: string | null
                    status?: 'scheduled' | 'cancelled'
                    created_at?: string
                    updated_at?: string
                }
            }
            bookings: {
                Row: {
                    id: string
                    user_id: string
                    class_session_id: string
                    status: 'confirmed' | 'cancelled'
                    payment_id: string | null
                    created_at: string
                    cancelled_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    class_session_id: string
                    status?: 'confirmed' | 'cancelled'
                    payment_id?: string | null
                    created_at?: string
                    cancelled_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    class_session_id?: string
                    status?: 'confirmed' | 'cancelled'
                    payment_id?: string | null
                    created_at?: string
                    cancelled_at?: string | null
                }
            }
            payments: {
                Row: {
                    id: string
                    user_id: string
                    stripe_payment_id: string | null
                    amount: number
                    currency: string
                    type: 'single_class' | 'package' | null
                    package_credits: number | null
                    status: 'pending' | 'succeeded' | 'failed' | 'refunded'
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    stripe_payment_id?: string | null
                    amount: number
                    currency?: string
                    type?: 'single_class' | 'package' | null
                    package_credits?: number | null
                    status?: 'pending' | 'succeeded' | 'failed' | 'refunded'
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    stripe_payment_id?: string | null
                    amount?: number
                    currency?: string
                    type?: 'single_class' | 'package' | null
                    package_credits?: number | null
                    status?: 'pending' | 'succeeded' | 'failed' | 'refunded'
                    created_at?: string
                }
            }
            packages: {
                Row: {
                    id: string
                    name: string
                    credits: number
                    price: number
                    description: string | null
                    active: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    credits: number
                    price: number
                    description?: string | null
                    active?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    credits?: number
                    price?: number
                    description?: string | null
                    active?: boolean
                    created_at?: string
                }
            }
        }
    }
}
