'use server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createPaymentIntent(amount: number) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents (e.g., $20.00 = 2000)
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error('Error creating Payment Intent:', error);
    throw new Error('Failed to create Payment Intent');
  }
}