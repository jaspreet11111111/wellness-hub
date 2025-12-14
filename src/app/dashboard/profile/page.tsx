import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/profile/profile-form'

export default async function ProfilePage() {
    const supabase = createClient()

    if (!supabase) {
        return <div>Supabase not configured</div>
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/login?redirect=/dashboard/profile')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!profile) {
        redirect('/dashboard')
    }

    return (
        <div className="min-h-screen bg-neutral-50 py-12">
            <div className="container mx-auto px-4 max-w-2xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-heading text-4xl font-bold text-primary-900 mb-2">
                        My Profile
                    </h1>
                    <p className="text-neutral-600">
                        Update your personal information
                    </p>
                </div>

                {/* Profile Form */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                    <ProfileForm
                        initialData={{
                            fullName: profile.full_name,
                            email: user.email || '',
                            phone: profile.phone || undefined,
                        }}
                    />
                </div>

                {/* Account Info */}
                <div className="mt-8 bg-white rounded-2xl shadow-md p-8">
                    <h2 className="font-heading text-xl font-bold text-neutral-900 mb-4">
                        Account Information
                    </h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-neutral-600">Account Type</span>
                            <span className="font-semibold text-neutral-900 capitalize">{profile.role}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-600">Member Since</span>
                            <span className="font-semibold text-neutral-900">
                                {new Date(profile.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-600">Available Credits</span>
                            <span className="font-semibold text-primary-700">{profile.credits}</span>
                        </div>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-8">
                    <a
                        href="/dashboard"
                        className="text-primary-700 hover:text-primary-800 font-medium"
                    >
                        ← Back to dashboard
                    </a>
                </div>
            </div>
        </div>
    )
}
