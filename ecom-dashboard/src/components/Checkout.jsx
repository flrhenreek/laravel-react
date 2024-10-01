import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Header from "./Header";
import { useCart } from "./CartContext"; // Import the custom hook

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal } = useCart(); // Using the custom hook to get the cart total
  const [currency, setCurrency] = useState("eur");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    try {
      const { paymentMethod, error: stripeError } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      // Use the total directly, already in cents from CartContext
      const amountInCents = cartTotal;
      console.log(`Amount to be charged: ${amountInCents}`); // Log the amount to be charged

      // Send paymentMethod.id and amount in cents to your backend
      const response = await axios.post(`http://127.0.0.1:8000/api/purchase`, {
        paymentMethodId: paymentMethod.id,
        amount: amountInCents, // Use the total directly
        currency: currency,
      });

      const { paymentIntent, status } = response.data;

      if (status === "success") {
        // Check if further action (like 3D secure) is required
        if (paymentIntent.status === "requires_action") {
          const { error: confirmError } = await stripe.confirmCardPayment(
            paymentIntent.client_secret
          );

          if (confirmError) {
            setError(confirmError.message);
            setLoading(false);
            return;
          }

          alert("Payment successful!");
        } else {
          alert("Payment successful!");
        }
      }
    } catch (error) {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h1 className="text-center mb-4">Checkout</h1>
        <form
          onSubmit={handleSubmit}
          className="checkout-form shadow p-4 rounded bg-light"
        >
          <div className="form-group">
            <label>Total Price:</label>
            <p className="font-weight-bold display-5">
              {(cartTotal / 100).toFixed(2)} {currency.toUpperCase()}{" "}
              {/* Display in euros */}
            </p>
          </div>
          <div className="form-group">
            <label>Currency:</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="form-control"
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
            </select>
          </div>
          <div className="form-group">
            <label>Card Details:</label>
            <div className="border p-3 rounded">
              <CardElement />
            </div>
          </div>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary btn-block mt-3 checkout-button"
            disabled={!stripe || loading}
          >
            {loading ? "Processing..." : "Pay"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Checkout;
