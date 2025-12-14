import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getAllBookings, getAllUsers } from '@/app/actions/admin'
import { formatDate, formatTime } from '@/lib/utils'

export default async function AdminDashboardPage() {
    const supabase = createClient()

    if (!supabase) {
        return <div>Supabase not configured</div>
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/login')
    }

    // Check admin status
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        redirect('/dashboard')
    }

    const [bookings, users] = await Promise.all([
        getAllBookings(),
        getAllUsers(),
    ])

    const totalRevenue = bookings
        .filter((b: any) => b.status === 'confirmed')
        .reduce((sum: number, b: any) => sum + Number(b.class_session?.class_type?.price || 0), 0)

    const activeUsers = users.filter((u: any) => u.role === 'client').length

    return (
        <div className="min-h-screen bg-neutral-50 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-heading text-4xl font-bold text-primary-900 mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-neutral-600">
                        Manage classes, users, and bookings
                    </p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="text-sm font-medium text-neutral-600 mb-1">Total Bookings</div>
                        <div className="text-3xl font-bold text-primary-900">{bookings.length}</div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="text-sm font-medium text-neutral-600 mb-1">Active Users</div>
                        <div className="text-3xl font-bold text-primary-900">{activeUsers}</div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="text-sm font-medium text-neutral-600 mb-1">Total Revenue</div>
                        <div className="text-3xl font-bold text-primary-900">${totalRevenue.toFixed(2)}</div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="text-sm font-medium text-neutral-600 mb-1">Upcoming Classes</div>
                        <div className="text-3xl font-bold text-primary-900">
                            {bookings.filter((b: any) => new Date(b.class_session.date) > new Date()).length}
                        </div>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                    <h2 className="font-heading text-2xl font-bold text-primary-900 mb-6">
                        Recent Bookings
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-neutral-200">
                                    <th className="text-left py-3 px-4 font-semibold text-neutral-700">User</th>
                                    <th className="text-left py-3 px-4 font-semibold text-neutral-700">Class</th>
                                    <th className="text-left py-3 px-4 font-semibold text-neutral-700">Date</th>
                                    <th className="text-left py-3 px-4 font-semibold text-neutral-700">Time</th>
                                    <th className="text-left py-3 px-4 font-semibold text-neutral-700">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.slice(0, 10).map((booking: any) => (
                                    <tr key={booking.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                                        <td className="py-3 px-4">
                                            <div className="font-medium">{booking.user?.full_name}</div>
                                            <div className="text-sm text-neutral-600">{booking.user?.email}</div>
                                        </td>
                                        <td className="py-3 px-4">{booking.class_session?.class_type?.name}</td>
                                        <td className="py-3 px-4">{formatDate(booking.class_session?.date)}</td>
                                        <td className="py-3 px-4">{formatTime(booking.class_session?.time)}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Users List */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="font-heading text-2xl font-bold text-primary-900 mb-6">
                        All Users
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-neutral-200">
                                    <th className="text-left py-3 px-4 font-semibold text-neutral-700">Name</th>
                                    <th className="text-left py-3 px-4 font-semibold text-neutral-700">Email</th>
                                    <th className="text-left py-3 px-4 font-semibold text-neutral-700">Credits</th>
                                    <th className="text-left py-3 px-4 font-semibold text-neutral-700">Role</th>
                                    <th className="text-left py-3 px-4 font-semibold text-neutral-700">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user: any) => (
                                    <tr key={user.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                                        <td className="py-3 px-4 font-medium">{user.full_name}</td>
                                        <td className="py-3 px-4 text-neutral-600">{user.email}</td>
                                        <td className="py-3 px-4">
                                            <span className="font-bold text-primary-700">{user.credits}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-neutral-600">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-8 flex gap-4">
                    <a
                        href="/admin/classes"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
                    >
                        Manage Classes
                    </a>
                    <a
                        href="/dashboard"
                        className="px-6 py-3 border border-neutral-300 hover:bg-neutral-50 text-neutral-900 rounded-lg font-semibold transition-colors"
                    >
                        ← Back to Dashboard
                    </a>
                </div>
            </div>
        </div>
    )
}
