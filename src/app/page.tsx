import HeroSection from '@/components/landing/hero'
import AboutSection from '@/components/landing/about'
import ClassesShowcase from '@/components/landing/classes-showcase'

export default function HomePage() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <ClassesShowcase />
            <AboutSection />
        </main>
    )
}
