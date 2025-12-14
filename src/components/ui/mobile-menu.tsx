'use client'

import Link from 'next/link'
import { useState } from 'react'
import LogoutButton from './logout-button'

export default function MobileMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2"
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="absolute top-16 left-0 right-0 md:hidden border-t border-neutral-200 bg-white shadow-lg">
                    <div className="px-4 py-4 space-y-3">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="block text-neutral-700 hover:text-primary-700 font-medium transition-colors py-2"
                        >
                            Home
                        </Link>
                        <Link
                            href="/schedule"
                            onClick={() => setIsOpen(false)}
                            className="block text-neutral-700 hover:text-primary-700 font-medium transition-colors py-2"
                        >
                            Classes
                        </Link>
                        <Link
                            href="/#about"
                            onClick={() => setIsOpen(false)}
                            className="block text-neutral-700 hover:text-primary-700 font-medium transition-colors py-2"
                        >
                            About
                        </Link>

                        {/* Divider */}
                        <div className="border-t border-neutral-200 my-2"></div>

                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="block text-neutral-700 hover:text-primary-700 font-medium transition-colors py-2"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/dashboard/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="block text-neutral-700 hover:text-primary-700 font-medium transition-colors py-2"
                                >
                                    Profile
                                </Link>
                                <div className="pt-2">
                                    <LogoutButton />
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block text-neutral-700 hover:text-primary-700 font-medium transition-colors py-2"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/register"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors text-center"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
