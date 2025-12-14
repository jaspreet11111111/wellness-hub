import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from './logout-button'
import MobileMenu from './mobile-menu'

export default async function Navbar() {
    const supabase = createClient()
    let user = null

    if (supabase) {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        user = authUser
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">W</span>
                        </div>
                        <span className="font-heading font-bold text-xl text-primary-900">Wellness Hub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-neutral-700 hover:text-primary-700 font-medium transition-colors">
                            Home
                        </Link>
                        <Link href="/schedule" className="text-neutral-700 hover:text-primary-700 font-medium transition-colors">
                            Classes
                        </Link>
                        <Link href="/#about" className="text-neutral-700 hover:text-primary-700 font-medium transition-colors">
                            About
                        </Link>

                        {/* Auth-Based Buttons */}
                        {user ? (
                            // Logged in: Show Dashboard, Profile, Logout
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-neutral-700 hover:text-primary-700 font-medium transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/dashboard/profile"
                                    className="text-neutral-700 hover:text-primary-700 font-medium transition-colors"
                                >
                                    Profile
                                </Link>
                                <LogoutButton />
                            </>
                        ) : (
                            // Logged out: Show Login, Sign Up
                            <>
                                <Link
                                    href="/auth/login"
                                    className="text-neutral-700 hover:text-primary-700 font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Component */}
                    <MobileMenu isLoggedIn={!!user} />
                </div>
            </div>
        </nav>
    )
}
