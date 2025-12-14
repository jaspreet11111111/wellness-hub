'use client'

import { bookClass } from '@/app/actions/bookings'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BookingButton({
    sessionId,
    isFull
}: {
    sessionId: string
    isFull: boolean
}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function handleBook() {
        setLoading(true)
        setError(null)

        const result = await bookClass(sessionId)

        if (result.error) {
            setError(result.error)
            setLoading(false)

            // Redirect to packages if no credits
            if (result.error.includes('credits')) {
                setTimeout(() => router.push('/dashboard/packages'), 2000)
            }
        } else {
            router.push('/dashboard')
        }
    }

    if (isFull) {
        return (
            <button
                disabled
                className="px-6 py-3 bg-neutral-300 text-neutral-500 rounded-lg font-semibold cursor-not-allowed"
            >
                Fully Booked
            </button>
        )
    }

    return (
        <div>
            <button
                onClick={handleBook}
                disabled={loading}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white rounded-lg font-semibold transition-colors"
            >
                {loading ? 'Booking...' : 'Book Now'}
            </button>

            {error && (
                <div className="mt-2 text-sm text-red-600">
                    {error}
                </div>
            )}
        </div>
    )
}
