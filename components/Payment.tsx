'use client';

import { loadStripe } from '@stripe/stripe-js';
import {useContext} from "react"
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { createPaymentIntent } from '@/app/actions/stripe';
import { ProductContext } from '@/app/context';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
  const {total , setCart} = useContext(ProductContext)
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create a Payment Intent
      const { clientSecret } = await createPaymentIntent(total); // amount in cents 
      if(!clientSecret){
        setError("failed to create payment intent")
        setLoading(false)
        return
      }

      // Confirm the payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement)!,
          billing_details: {
            // Add billing details if needed
            name: 'Customer Name', // Replace with dynamic data if required
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
        setCart([])
      }
    } catch (error) {
      setError('An error occurred during payment');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="space-y-4">
        {/* Card Number Field */}
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <div className="mt-1">
            <CardNumberElement
              id="cardNumber"
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
              className="p-3 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>

        {/* Expiration Date Field */}
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Expiration Date
          </label>
          <div className="mt-1">
            <CardExpiryElement
              id="expiryDate"
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
              className="p-3 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>

        {/* CVC Field */}
        <div>
          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
            CVC
          </label>
          <div className="mt-1">
            <CardCvcElement
              id="cvc"
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
              className="p-3 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Pay'}
      </button>

      {/* Error and Success Messages */}
      {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      {success && <div className="mt-4 text-green-500 text-center">Payment Successful!</div>}
    </form>
  );
}

export default function PaymentForm() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}