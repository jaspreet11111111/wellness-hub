import { getUserBookings } from '@/app/actions/bookings'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { formatDate, formatTime, formatCurrency } from '@/lib/utils'
import CancelBookingButton from '@/components/booking/cancel-booking-button'

export default async function DashboardPage() {
    const supabase = createClient()

    if (!supabase) {
        return <div>Supabase not configured</div>
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/login?redirect=/dashboard')
    }

    // Get user profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    // Get bookings
    const bookings = await getUserBookings()

    // Filter upcoming and past bookings
    const now = new Date()
    const upcomingBookings = bookings.filter((b: any) => {
        const classDate = new Date(b.class_session.date)
        return classDate >= now && b.status === 'confirmed'
    })

    const pastBookings = bookings.filter((b: any) => {
        const classDate = new Date(b.class_session.date)
        return classDate <= now || b.status === 'cancelled'
    })

    return (
        <div className="min-h-screen bg-neutral-50 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-heading text-4xl font-bold text-primary-900 mb-2">
                        My Dashboard
                    </h1>
                    <p className="text-neutral-600">
                        Welcome back, {profile?.full_name}!
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-900">{profile?.credits || 0}</div>
                                <div className="text-sm text-neutral-600">Available Credits</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-900">{upcomingBookings.length}</div>
                                <div className="text-sm text-neutral-600">Upcoming Classes</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-900">{pastBookings.length}</div>
                                <div className="text-sm text-neutral-600">Classes Attended</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <a
                        href="/schedule"
                        className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-white"
                    >
                        <h3 className="font-heading text-xl font-bold mb-2">Browse Classes</h3>
                        <p className="text-primary-50">Find and book your next class</p>
                    </a>

                    <a
                        href="/dashboard/packages"
                        className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-white"
                    >
                        <h3 className="font-heading text-xl font-bold mb-2">Buy Credits</h3>
                        <p className="text-green-50">Purchase a class package</p>
                    </a>

                    <a
                        href="/dashboard/profile"
                        className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-white"
                    >
                        <h3 className="font-heading text-xl font-bold mb-2">My Profile</h3>
                        <p className="text-purple-50">Update your information</p>
                    </a>
                </div>

                {/* Upcoming Bookings */}
                <div className="mb-12">
                    <h2 className="font-heading text-2xl font-bold text-primary-900 mb-6">Upcoming Classes</h2>
                    {upcomingBookings.length === 0 ? (
                        <div className="bg-white rounded-2xl p-8 text-center">
                            <p className="text-neutral-600 mb-4">No upcoming classes booked</p>
                            <a
                                href="/schedule"
                                className="inline-block px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
                            >
                                Browse Classes
                            </a>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {upcomingBookings.map((booking: any) => (
                                <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-md">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="font-heading text-xl font-bold text-primary-900 mb-2">
                                                {booking.class_session.class_type.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {formatDate(booking.class_session.date)}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {formatTime(booking.class_session.time)}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    </svg>
                                                    {booking.class_session.location}
                                                </div>
                                            </div>
                                        </div>
                                        <CancelBookingButton
                                            bookingId={booking.id}
                                            classDate={booking.class_session.date}
                                            classTime={booking.class_session.time}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Past Bookings */}
                {pastBookings.length > 0 && (
                    <div>
                        <h2 className="font-heading text-2xl font-bold text-primary-900 mb-6">Past Classes</h2>
                        <div className="grid gap-4">
                            {pastBookings.map((booking: any) => (
                                <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-md opacity-75">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-heading text-lg font-bold text-neutral-700 mb-1">
                                                {booking.class_session.class_type.name}
                                            </h3>
                                            <div className="text-sm text-neutral-600">
                                                {formatDate(booking.class_session.date)} at {formatTime(booking.class_session.time)}
                                            </div>
                                        </div>
                                        <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${booking.status === 'cancelled'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-green-100 text-green-700'
                                            }`}>
                                            {booking.status === 'cancelled' ? 'Cancelled' : 'Completed'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
