import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero.png"
                    alt="Yoga studio"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
                        <span className="text-white/90 font-medium">Transform Your Mind & Body</span>
                    </div>

                    {/* Heading */}
                    <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                        Find Your Inner Peace
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-300">
                            Through Yoga & Meditation
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow">
                        Join our community of wellness seekers. Expert-led classes designed to strengthen your body,
                        calm your mind, and elevate your spirit.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/schedule"
                            className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-xl"
                        >
                            Browse Classes
                        </Link>
                        <Link
                            href="/auth/register"
                            className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-xl"
                        >
                            Start Free Trial
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-1">500+</div>
                            <div className="text-white/70 text-sm">Happy Students</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-1">50+</div>
                            <div className="text-white/70 text-sm">Expert Teachers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-1">1000+</div>
                            <div className="text-white/70 text-sm">Classes Held</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
                <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    )
}
