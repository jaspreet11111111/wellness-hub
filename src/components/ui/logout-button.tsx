'use client'

import { logout } from '@/app/actions/auth'
import { useState } from 'react'

export default function LogoutButton() {
    const [loading, setLoading] = useState(false)

    async function handleLogout() {
        setLoading(true)
        await logout()
        window.location.href = '/'
    }

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-50 rounded-lg font-medium transition-colors"
        >
            {loading ? 'Logging out...' : 'Logout'}
        </button>
    )
}
