import { formatCurrency } from '@/lib/utils'
import { Database } from '@/lib/supabase/types'
import Image from 'next/image'

type ClassType = Database['public']['Tables']['class_types']['Row']

// Temporary mock data - will be replaced with real data from Supabase
const mockClasses: ClassType[] = [
    {
        id: '1',
        name: 'Hatha Yoga',
        description: 'Traditional yoga practice focusing on physical postures and breathing techniques. Perfect for beginners.',
        duration: 60,
        price: 20,
        difficulty_level: 'beginner',
        image_url: null,
        active: true,
        created_at: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Vinyasa Flow',
        description: 'Dynamic flowing sequences that sync breath with movement. Build strength and flexibility.',
        duration: 75,
        price: 25,
        difficulty_level: 'intermediate',
        image_url: null,
        active: true,
        created_at: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'Yin Yoga',
        description: 'Slow-paced practice with poses held for longer periods. Great for deep stretching',
        duration: 60,
        price: 20,
        difficulty_level: 'beginner',
        image_url: null,
        active: true,
        created_at: new Date().toISOString(),
    },
]

const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
}

export default function ClassesShowcase() {
    return (
        <section className="py-24 px-4 bg-neutral-50">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-900 mb-4">
                        Explore Our Classes
                    </h2>
                    <p className="text-lg text-neutral-700">
                        Choose from a variety of yoga styles and wellness practices designed to meet you where you are.
                    </p>
                </div>

                {/* Classes Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockClasses.map((classType) => (
                        <div
                            key={classType.id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            {/* Image */}
                            <div className="aspect-[4/3] relative overflow-hidden">
                                <Image
                                    src={`/images/${classType.name.toLowerCase().replaceAll(' ', '')}.png`}
                                    alt={classType.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover"
                                />

                                {/* Difficulty Badge */}
                                {classType.difficulty_level && (
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[classType.difficulty_level]}`}>{classType.difficulty_level.charAt(0).toUpperCase() + classType.difficulty_level.slice(1)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="font-heading text-2xl font-bold text-primary-900 mb-2">
                                        {classType.name}
                                    </h3>
                                    <p className="text-neutral-600 text-sm line-clamp-2">
                                        {classType.description}
                                    </p>
                                </div>

                                {/* Meta Info */}
                                <div className="flex items-center gap-4 text-sm text-neutral-600">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{classType.duration} min</span>
                                    </div>
                                    <div className="flex items-center gap-1 font-semibold text-primary-700">
                                        {formatCurrency(classType.price)}
                                    </div>
                                </div>

                                {/* CTA */}
                                <a
                                    href="/schedule"
                                    className="block w-full text-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
                                >
                                    Book Now
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="text-center mt-12">
                    <a
                        href="/schedule"
                        className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 font-semibold text-lg group"
                    >
                        View Full Schedule
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
