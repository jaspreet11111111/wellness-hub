'use server'

import { stripe } from '@/lib/stripe/server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createCheckoutSession(packageId: string) {
    const supabase = createClient()

    if (!supabase) {
        return { error: 'Supabase not configured' }
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        return { error: 'You must be logged in to purchase a package' }
    }

    // Get package details
    const { data: pkg, error: pkgError } = await supabase
        .from('packages')
        .select('*')
        .eq('id', packageId)
        .single()

    if (pkgError || !pkg) {
        return { error: 'Package not found' }
    }

    try {
        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: pkg.name,
                            description: pkg.description || `${pkg.credits} class credits`,
                        },
                        unit_amount: Math.round(Number(pkg.price) * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/packages/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/packages`,
            metadata: {
                userId: user.id,
                packageId: pkg.id,
                credits: pkg.credits.toString(),
            },
            customer_email: user.email,
        })

        return { sessionId: session.id, url: session.url }
    } catch (error: any) {
        console.error('Stripe error:', error)
        return { error: error.message || 'Failed to create checkout session' }
    }
}

export async function handleSuccessfulPayment(sessionId: string) {
    const supabase = createClient()

    if (!supabase) {
        return { error: 'Supabase not configured' }
    }

    try {
        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if (session.payment_status !== 'paid') {
            return { error: 'Payment not completed' }
        }

        const { userId, packageId, credits } = session.metadata || {}

        if (!userId || !credits) {
            return { error: 'Invalid session metadata' }
        }

        // Check if payment already processed (idempotency)
        const { data: existingPayment } = await supabase
            .from('payments')
            .select('id, package_credits')
            .eq('stripe_payment_id', session.payment_intent as string)
            .single()

        if (existingPayment) {
            // Payment already processed - return success with existing credits
            console.log('Payment already processed, returning existing record')
            return { success: true, credits: existingPayment.package_credits }
        }

        // Record payment (first time)
        const { error: paymentError } = await supabase
            .from('payments')
            .insert({
                user_id: userId,
                stripe_payment_id: session.payment_intent as string,
                amount: Number(session.amount_total) / 100,
                currency: session.currency || 'usd',
                type: 'package',
                package_credits: parseInt(credits),
                status: 'succeeded',
            })

        if (paymentError) {
            console.error('Payment record error:', paymentError)
            return { error: 'Failed to record payment' }
        }

        // Add credits to user profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('credits')
            .eq('id', userId)
            .single()

        if (profile) {
            await supabase
                .from('profiles')
                .update({ credits: profile.credits + parseInt(credits) })
                .eq('id', userId)
        }

        return { success: true, credits: parseInt(credits) }
    } catch (error: any) {
        console.error('Success handler error:', error)
        return { error: error.message || 'Failed to process payment' }
    }
}
