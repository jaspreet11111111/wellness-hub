'use client'

import { updateProfile } from '@/app/actions/profile'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfileForm({
    initialData,
}: {
    initialData: {
        fullName: string
        email: string
        phone?: string
    }
}) {
    const [fullName, setFullName] = useState(initialData.fullName)
    const [phone, setPhone] = useState(initialData.phone || '')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        const result = await updateProfile({
            fullName,
            phone: phone || undefined,
        })

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)
            setTimeout(() => {
                router.push('/dashboard')
            }, 1500)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name
                </label>
                <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            {/* Email (read-only) */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={initialData.email}
                    disabled
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg bg-neutral-50 text-neutral-500 cursor-not-allowed"
                />
                <p className="text-xs text-neutral-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Phone */}
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number (Optional)
                </label>
                <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            {/* Error */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            {/* Success */}
            {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    Profile updated successfully! Redirecting...
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white rounded-lg font-semibold transition-colors"
            >
                {loading ? 'Saving...' : 'Save Changes'}
            </button>
        </form>
    )
}
