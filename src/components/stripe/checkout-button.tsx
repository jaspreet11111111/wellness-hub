'use client'

import { createCheckoutSession } from '@/app/actions/stripe'
import { getStripe } from '@/lib/stripe/client'
import { useState } from 'react'

export default function CheckoutButton({
    packageId,
    packageName
}: {
    packageId: string
    packageName: string
}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleCheckout() {
        setLoading(true)
        setError(null)

        try {
            const { sessionId, url, error: checkoutError } = await createCheckoutSession(packageId)

            if (checkoutError || !sessionId || !url) {
                setError(checkoutError || 'Failed to create checkout session')
                setLoading(false)
                return
            }

            // Redirect to Stripe Checkout
            const stripe = await getStripe()
            if (stripe) {
                await stripe.redirectToCheckout({ sessionId })
            } else {
                // Fallback: redirect to URL directly
                window.location.href = url
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred')
            setLoading(false)
        }
    }

    return (
        <div>
            <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white rounded-lg font-semibold transition-colors"
            >
                {loading ? 'Processing...' : 'Purchase Package'}
            </button>

            {error && (
                <div className="mt-2 text-sm text-red-600">
                    {error}
                </div>
            )}
        </div>
    )
}
