const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://lcuzoemvytnsydjzcqpz.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdXpvZW12eXRuc3lkanpjcXB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTQ0Mjc1NCwiZXhwIjoyMDgxMDE4NzU0fQ.rUBkeg6pFF7koHFymr9eAP5KlODuF06YLv5N8kLGb3s'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
    console.log('Setting up database...')

    // Insert class types
    const classTypes = [
        {
            name: 'Hatha Yoga',
            description: 'Traditional yoga practice focusing on physical postures and breathing techniques. Perfect for beginners and those seeking a gentle practice.',
            duration: 60,
            price: 20.00,
            difficulty_level: 'beginner',
            active: true
        },
        {
            name: 'Vinyasa Flow',
            description: 'Dynamic flowing yoga sequences that sync breath with movement. Build strength and flexibility.',
            duration: 75,
            price: 25.00,
            difficulty_level: 'intermediate',
            active: true
        },
        {
            name: 'Yin Yoga',
            description: 'Slow-paced practice with poses held for longer periods. Great for deep stretching and relaxation.',
            duration: 60,
            price: 20.00,
            difficulty_level: 'beginner',
            active: true
        },
        {
            name: 'Power Yoga',
            description: 'Intense, fitness-based yoga that builds strength and endurance. Challenging flows for experienced students.',
            duration: 60,
            price: 28.00,
            difficulty_level: 'advanced',
            active: true
        },
        {
            name: 'Meditation & Breathwork',
            description: 'Guided meditation and breathing exercises for relaxation and mental clarity.',
            duration: 45,
            price: 18.00,
            difficulty_level: 'beginner',
            active: true
        }
    ]

    const { data: insertedClasses, error: classError } = await supabase
        .from('class_types')
        .insert(classTypes)
        .select()

    if (classError) {
        console.error('Error inserting class types:', classError)
        return
    }

    console.log('✓ Inserted class types:', insertedClasses.length)

    // Insert class sessions (upcoming classes)
    const today = new Date()
    const sessions = []

    // Create 10 upcoming sessions
    for (let i = 0; i < 10; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() + i + 1)

        const classType = insertedClasses[i % insertedClasses.length]

        sessions.push({
            class_type_id: classType.id,
            date: date.toISOString().split('T')[0],
            time: i % 2 === 0 ? '09:00' : '18:00',
            duration: classType.duration,
            max_capacity: 10,
            booked_count: Math.floor(Math.random() * 3), // Random bookings
            location: 'Wellness Studio',
            status: 'scheduled'
        })
    }

    const { data: insertedSessions, error: sessionError } = await supabase
        .from('class_sessions')
        .insert(sessions)
        .select()

    if (sessionError) {
        console.error('Error inserting class sessions:', sessionError)
        return
    }

    console.log('✓ Inserted class sessions:', insertedSessions.length)

    // Insert packages
    const packages = [
        {
            name: '5-Class Pack',
            credits: 5,
            price: 90.00,
            description: 'Save $10 with our 5-class package. Perfect for trying out different classes.',
            active: true
        },
        {
            name: '10-Class Pack',
            credits: 10,
            price: 170.00,
            description: 'Save $30 with our most popular package. Great value for regular practice.',
            active: true
        },
        {
            name: '20-Class Pack',
            credits: 20,
            price: 320.00,
            description: 'Save $80 with our best value package. Ideal for dedicated practitioners.',
            active: true
        }
    ]

    const { data: insertedPackages, error: packageError } = await supabase
        .from('packages')
        .insert(packages)
        .select()

    if (packageError) {
        console.error('Error inserting packages:', packageError)
        return
    }

    console.log('✓ Inserted packages:', insertedPackages.length)
    console.log('\n✅ Database setup complete!')
}

setupDatabase().catch(console.error)
