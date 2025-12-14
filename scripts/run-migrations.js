const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const supabaseUrl = 'https://lcuzoemvytnsydjzcqpz.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdXpvZW12eXRuc3lkanpjcXB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTQ0Mjc1NCwiZXhwIjoyMDgxMDE4NzU0fQ.rUBkeg6pFF7koHFymr9eAP5KlODuF06YLv5N8kLGb3s'

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

async function runMigration() {
    console.log('Running database migrations...')

    const migrationFile = path.join(__dirname, '../supabase/migrations/001_initial_schema.sql')
    const sql = fs.readFileSync(migrationFile, 'utf8')

    // Execute the full SQL migration
    const { data, error } = await supabase.rpc('exec_sql', { sql })

    if (error) {
        console.log('RPC method not available, trying direct SQL execution...')

        // Split and execute statements individually (for compatibility)
        const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0 && !s.startsWith('--'))

        let successCount = 0
        let errorCount = 0

        for (const statement of statements) {
            if (statement) {
                // Skip extension and trigger creation (might fail if already exists)
                if (statement.includes('CREATE EXTENSION') || statement.includes('CREATE TRIGGER') || statement.includes('CREATE POLICY')) {
                    continue
                }

                const { error: execError } = await supabase.from('_migrations').insert({})
                // This won't work either, we need a different approach
            }
        }

        console.log('\n❌ Cannot run migrations automatically.')
        console.log('\n📝 MANUAL SETUP REQUIRED:')
        console.log('1. Go to: https://app.supabase.com/project/lcuzoemvytnsydjzcqpz/sql')
        console.log('2. Click "New Query"')
        console.log('3. Copy the entire file: supabase/migrations/001_initial_schema.sql')
        console.log('4. Paste and click "Run"')
        console.log('\nThen run this script again to add sample data.')
        return false
    }

    console.log('✓ Migration complete!')
    return true
}

runMigration().catch(console.error)
