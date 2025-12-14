export default function AboutSection() {
    return (
        <section id="about" className="py-24 px-4 bg-white">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <div className="relative">
                        <div className="aspect-[4/5] bg-gradient-to-br from-primary-300 to-secondary-500 rounded-3xl overflow-hidden">
                            <img
                                src="/images/instructor/profile.jpg"
                                alt="Siobhan Sears - Yoga Instructor"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Decorative element */}
                        <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-4 border-primary-200 rounded-3xl" />
                    </div>

                    {/* Content Side */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-900">
                                Hi, I'm Siobhan! 🌞
                            </h2>
                            <div className="w-20 h-1 bg-primary-500" />
                        </div>

                        <p className="text-lg text-neutral-700 leading-relaxed">
                            Based in beautiful Halifax, Nova Scotia, I'm a yoga teacher, Thai massage practitioner,
                            and early childhood educator who believes in the healing power of mindful movement and nurturing touch.
                        </p>

                        <p className="text-neutral-600 leading-relaxed">
                            As a self-proclaimed "sun worshipper," I draw  inspiration from nature and the changing seasons
                            of the Maritimes. My teaching style blends traditional yoga wisdom with the therapeutic benefits
                            of Thai massage, creating a unique and deeply restorative experience for every student.
                        </p>

                        <p className="text-neutral-600 leading-relaxed">
                            Whether you're looking to build strength, find flexibility, or simply create space for peace
                            in your day, I'm here to support you on your wellness journey with warmth, authenticity, and a
                            whole lot of sunshine. ☀️
                        </p>

                        {/* Credentials */}
                        <div className="space-y-4 pt-4">
                            <h3 className="font-heading text-xl font-semibold text-primary-800">
                                Certifications & Specialties
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-neutral-700">Certified Yoga Teacher</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-neutral-700">Thai Massage Practitioner</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-neutral-700">Early Childhood Educator (Kids Yoga)</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-neutral-700">Full Ashtanga Primary Series</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
