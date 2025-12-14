'use client'

import { cancelBooking } from '@/app/actions/bookings'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CancelBookingButton({
    bookingId,
    classDate,
    classTime
}: {
    bookingId: string
    classDate: string
    classTime: string
}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function handleCancel() {
        if (!confirm('Are you sure you want to cancel this booking? Your credit will be refunded if cancelled more than 24 hours before class.')) {
            return
        }

        setLoading(true)
        setError(null)

        const result = await cancelBooking(bookingId)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            router.refresh()
        }
    }

    return (
        <div>
            <button
                onClick={handleCancel}
                disabled={loading}
                className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-50 rounded-lg font-medium transition-colors"
            >
                {loading ? 'Cancelling...' : 'Cancel Booking'}
            </button>

            {error && (
                <div className="mt-2 text-sm text-red-600">
                    {error}
                </div>
            )}
        </div>
    )
}
