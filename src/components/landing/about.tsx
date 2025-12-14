export default function AboutSection() {
    return (
        <section id="about" className="py-24 px-4 bg-white">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <div className="relative">
                        <div className="aspect-[4/5] bg-gradient-to-br from-primary-300 to-secondary-500 rounded-3xl overflow-hidden">
                            {/* Placeholder for instructor photo */}
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-center text-white/90">
                                    <svg className="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <p className="text-lg font-medium">Instructor Photo</p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative element */}
                        <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-4 border-primary-200 rounded-3xl" />
                    </div>

                    {/* Content Side */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-900">
                                Meet Your Instructor
                            </h2>
                            <div className="w-20 h-1 bg-primary-500" />
                        </div>

                        <p className="text-lg text-neutral-700 leading-relaxed">
                            With over 5 years of dedicated practice and teaching, I'm passionate about
                            helping others discover the transformative power of yoga and mindful movement.
                        </p>

                        <p className="text-neutral-600 leading-relaxed">
                            My teaching philosophy centers on creating a welcoming, inclusive space where
                            students of all levels can explore their practice, build strength and flexibility,
                            and cultivate inner peace. Every class is designed to meet you exactly where you are
                            on your wellness journey.
                        </p>

                        {/* Credentials */}
                        <div className="space-y-4 pt-4">
                            <h3 className="font-heading text-xl font-semibold text-primary-800">
                                Certifications & Training
                            </h3> <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-neutral-700">200-Hour Yoga Teacher Training (RYT-200)</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-neutral-700">Advanced Vinyasa Flow Specialization</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-neutral-700">Meditation & Mindfulness Certification</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-neutral-700">Anatomy for Yoga Teachers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
