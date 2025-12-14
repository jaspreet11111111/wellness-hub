'use client'

import { signIn } from '@/app/actions/auth'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)

        const result = await signIn(formData)

        if (result?.error) {
            setError(result.error)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary-100 via-neutral-50 to-accent-500/20">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="font-heading text-4xl font-bold text-primary-900 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-neutral-600">
                        Sign in to continue your wellness journey
                    </p>
                </div>

                {/* Login Form */}
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

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500" />
                                    <span className="text-neutral-600">Remember me</span>
                                </label>
                                <Link href="/auth/reset-password" className="text-primary-700 hover:text-primary-800 font-medium">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-400 text-white rounded-lg font-semibold transition-colors"
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm text-neutral-600">
                        Don't have an account?{' '}
                        <Link href="/auth/register" className="text-primary-700 hover:text-primary-800 font-semibold">
                            Sign up
                        </Link>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <Link href="/" className="text-neutral-600 hover:text-neutral-800 text-sm">
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    )
}
