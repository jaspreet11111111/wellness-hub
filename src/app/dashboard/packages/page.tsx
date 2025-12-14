import { getPackages } from '@/app/actions/packages'
import { formatCurrency } from '@/lib/utils'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CheckoutButton from '@/components/stripe/checkout-button'

export default async function PackagesPage() {
    const supabase = createClient()

    if (!supabase) {
        return <div>Supabase not configured</div>
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/login?redirect=/dashboard/packages')
    }

    const packages = await getPackages()

    return (
        <div className="min-h-screen bg-neutral-50 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-900 mb-4">
                        Class Packages
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Purchase credits to book your classes. The more you buy, the more you save!
                    </p>
                </div>

                {/* Packages Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {packages.map((pkg: any, index: number) => {
                        const savings = (pkg.credits * 20) - Number(pkg.price)
                        const isPopular = index === 1 // Middle package is most popular

                        return (
                            <div
                                key={pkg.id}
                                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all ${isPopular ? 'ring-4 ring-primary-500 scale-105' : ''
                                    }`}
                            >
                                {isPopular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                                            MOST POPULAR
                                        </span>
                                    </div>
                                )}

                                <div className="p-8">
                                    {/* Package Name */}
                                    <h3 className="font-heading text-2xl font-bold text-primary-900 mb-2">
                                        {pkg.name}
                                    </h3>

                                    {/* Credits */}
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-5xl font-bold text-primary-700">{pkg.credits}</span>
                                        <span className="text-neutral-600">credits</span>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-bold text-neutral-900">
                                                {formatCurrency(pkg.price)}
                                            </span>
                                        </div>
                                        <div className="text-sm text-neutral-600 mt-1">
                                            {formatCurrency(Number(pkg.price) / pkg.credits)} per class
                                        </div>
                                        {savings > 0 && (
                                            <div className="mt-2">
                                                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Save {formatCurrency(savings)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-neutral-600 text-sm mb-6">
                                        {pkg.description}
                                    </p>

                                    {/* CTA Button */}
                                    <CheckoutButton packageId={pkg.id} packageName={pkg.name} />

                                    {/* Note */}
                                    <p className="text-xs text-neutral-500 mt-4 text-center">
                                        Credits never expire
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Features */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <h3 className="font-heading text-2xl font-bold text-center text-primary-900 mb-8">
                        Why Buy Packages?
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-lg mb-2">Save Money</h4>
                            <p className="text-sm text-neutral-600">Get more value with bulk purchases</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-lg mb-2">Never Expire</h4>
                            <p className="text-sm text-neutral-600">Use your credits anytime</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-lg mb-2">Quick Booking</h4>
                            <p className="text-sm text-neutral-600">Skip payment at checkout</p>
                        </div>
                    </div>
                </div>

                {/* Back Link */}
                <div className="text-center mt-12">
                    <a href="/dashboard" className="text-primary-700 hover:text-primary-800 font-medium">
                        ← Back to dashboard
                    </a>
                </div>
            </div>
        </div>
    )
}
