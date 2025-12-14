export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary-100 via-neutral-50 to-accent-500/20">
            <div className="w-full max-w-md text-center">
                <div className="glass rounded-2xl p-12 shadow-xl">
                    {/* Success Icon */}
                    <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                        </svg>
                    </div>

                    <h1 className="font-heading text-3xl font-bold text-primary-900 mb-4">
                        Check Your Email
                    </h1>

                    <p className="text-neutral-600 mb-8">
                        We've sent you a verification link. Please check your email and click the link to activate your account.
                    </p>

                    <div className="space-y-4">
                        <a
                            href="/auth/login"
                            className="block w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
                        >
                            Return to Login
                        </a>

                        <a
                            href="/"
                            className="block text-neutral-600 hover:text-neutral-800 text-sm"
                        >
                            ← Back to home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
