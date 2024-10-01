import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Header from "./Header";

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
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

      // Send paymentMethod.id and amount to your backend
      const response = await axios.post(`http://127.0.0.1:8000/api/purchase`, {
        paymentMethodId: paymentMethod.id,
        amount: parseFloat(amount),
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
      <Header></Header>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Currency:</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </select>
        </div>
        <CardElement />
        {error && <div>{error}</div>}
        <button type="submit" disabled={!stripe || loading}>
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
    </>
  );
}

export default Checkout;
