<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Stripe\Charge;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class PurchaseController extends Controller
{
    public function processPayment(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'currency' => 'required|string',
            'paymentMethodId' => 'required|string',
        ]);

        // Set your Stripe secret key
        Stripe::setApiKey(env('STRIPE_SECRET'));

        try {
            // Create a PaymentIntent with the specified amount, currency, and payment method
            $paymentIntent = PaymentIntent::create([
                'amount' => $request->amount, // Convert to cents
                'currency' => $request->currency,
                'payment_method' => $request->paymentMethodId,
                'confirmation_method' => 'manual',
                'confirm' => true, // Immediately attempt to confirm the payment
                'return_url' => 'http://127.0.0.1:5173', // Add the return_url here
            ]);

            return response()->json(['status' => 'success', 'paymentIntent' => $paymentIntent]);

        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

}
