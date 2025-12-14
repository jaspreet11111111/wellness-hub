import { getUpcomingClassSessions } from '@/app/actions/classes'
import { formatDate, formatTime, formatCurrency } from '@/lib/utils'
import { createClient } from '@/lib/supabase/server'
import BookingButton from '@/components/booking/booking-button'

export default async function SchedulePage() {
    const sessions = await getUpcomingClassSessions()

    // Check if user is logged in
    const supabase = createClient()
    const { data: { user } } = supabase ? await supabase.auth.getUser() : { data: { user: null } }

    return (
        <div className="min-h-screen bg-neutral-50">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-900 mb-4">
                        Class Schedule
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Browse our upcoming classes and book your spot. All times are local.
                    </p>
                </div>

                {/* Class Sessions */}
                {sessions.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 mx-auto bg-neutral-200 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-neutral-700 mb-2">
                            No Classes Scheduled Yet
                        </h3>
                        <p className="text-neutral-600 mb-4">
                            Check back soon for upcoming classes!
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 max-w-4xl mx-auto">
                        {sessions.map((session) => {
                            const spotsLeft = session.max_capacity - session.booked_count
                            const isFull = spotsLeft <= 0

                            return (
                                <div
                                    key={session.id}
                                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        {/* Left: Class Info */}
                                        <div className="flex-1">
                                            <div className="flex items-start gap-4">
                                                {/* Date Badge */}
                                                <div className="flex-shrink-0 text-center">
                                                    <div className="w-16 h-16 bg-primary-500 rounded-lg flex flex-col items-center justify-center text-white">
                                                        <div className="text-xs font-medium">
                                                            {new Date(session.date).toLocaleDateString('en-US', { month: 'short' })}
                                                        </div>
                                                        <div className="text-2xl font-bold">
                                                            {new Date(session.date).getDate()}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Class Details */}
                                                <div className="flex-1">
                                                    <h3 className="font-heading text-2xl font-bold text-primary-900 mb-1">
                                                        {session.class_type.name}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 mb-2">
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {formatTime(session.time)}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {session.duration} min
                                                        </div>
                                                        {session.location && (
                                                            <div className="flex items-center gap-1">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                                {session.location}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Capacity */}
                                                    <div className="flex items-center gap-2">
                                                        {isFull ? (
                                                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                                                Class Full
                                                            </span>
                                                        ) : spotsLeft <= 3 ? (
                                                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                                                                Only {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left!
                                                            </span>
                                                        ) : (
                                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                                                {spotsLeft} spots available
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: Price & CTA */}
                                        <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2">
                                            <div className="text-right">
                                                <div className="font-heading text-3xl font-bold text-primary-700">
                                                    {formatCurrency(session.class_type.price)}
                                                </div>
                                                <div className="text-xs text-neutral-500">per class</div>
                                            </div>

                                            {user ? (
                                                <BookingButton sessionId={session.id} isFull={isFull} />
                                            ) : (
                                                <a
                                                    href={`/auth/login?redirect=/schedule`}
                                                    className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors text-center"
                                                >
                                                    Login to Book
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Back to Home */}
                <div className="text-center mt-12">
                    <a href="/" className="text-primary-700 hover:text-primary-800 font-medium">
                        ← Back to home
                    </a>
                </div>
            </div>
        </div>
    )
}
