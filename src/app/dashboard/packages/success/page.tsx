import { handleSuccessfulPayment } from '@/app/actions/stripe'
import { redirect } from 'next/navigation'

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: { session_id?: string }
}) {
    const sessionId = searchParams.session_id

    if (!sessionId) {
        redirect('/dashboard/packages')
    }

    const result = await handleSuccessfulPayment(sessionId)

    if (result.error) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h1 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
                        Payment Error
                    </h1>
                    <p className="text-neutral-600 mb-6">
                        {result.error}
                    </p>
                    <a
                        href="/dashboard/packages"
                        className="inline-block px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
                    >
                        Try Again
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md text-center">
                {/* Success Icon */}
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                {/* Success Message */}
                <h1 className="font-heading text-3xl font-bold text-primary-900 mb-2">
                    Payment Successful!
                </h1>
                <p className="text-neutral-600 mb-6">
                    Your purchase was successful. {result.credits} credits have been added to your account.
                </p>

                {/* Credits Display */}
                <div className="bg-primary-50 rounded-lg p-6 mb-6">
                    <div className="text-primary-900 font-bold text-5xl mb-2">
                        +{result.credits}
                    </div>
                    <div className="text-primary-700 font-medium">
                        Credits Added
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <a
                        href="/schedule"
                        className="flex-1 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
                    >
                        Browse Classes
                    </a>
                    <a
                        href="/dashboard"
                        className="flex-1 px-6 py-3 border border-neutral-300 hover:bg-neutral-50 text-neutral-900 rounded-lg font-semibold transition-colors"
                    >
                        Go to Dashboard
                    </a>
                </div>

                {/* Receipt Info */}
                <p className="text-sm text-neutral-500 mt-6">
                    A receipt has been sent to your email
                </p>
            </div>
        </div>
    )
}
