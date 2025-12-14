'use client'

import { resetPassword } from '@/app/actions/auth'
import Link from 'next/link'
import { useState } from 'react'

export default function ResetPasswordPage() {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)

        const result = await resetPassword(formData)

        if (result?.error) {
            setError(result.error)
            setLoading(false)
        } else if (result?.success) {
            setSuccess(true)
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary-100 via-neutral-50 to-accent-500/20">
                <div className="w-full max-w-md text-center">
                    <div className="glass rounded-2xl p-12 shadow-xl">
                        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h1 className="font-heading text-3xl font-bold text-primary-900 mb-4">
                            Check Your Email
                        </h1>

                        <p className="text-neutral-600 mb-8">
                            We've sent you a password reset link. Please check your email.
                        </p>

                        <Link
                            href="/auth/login"
                            className="block w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
                        >
                            Return to Login
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary-100 via-neutral-50 to-accent-500/20">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="font-heading text-4xl font-bold text-primary-900 mb-2">
                        Reset Password
                    </h1>
                    <p className="text-neutral-600">
                        Enter your email and we'll send you a reset link
                    </p>
                </div>

                <div className="glass rounded-2xl p-8 shadow-xl">
                    <form action={handleSubmit}>
                        <div className="space-y-5">
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-400 text-white rounded-lg font-semibold transition-colors"
                            >
                                {loading ? 'Sending reset link...' : 'Send Reset Link'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm text-neutral-600">
                        Remember your password?{' '}
                        <Link href="/auth/login" className="text-primary-700 hover:text-primary-800 font-semibold">
                            Sign in
                        </Link>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-neutral-600 hover:text-neutral-800 text-sm">
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    )
}
