import { useState, useContext } from "react";
import Header from "./Header";
import { CartContext } from "./CartContext"; // Assuming you have a CartContext for cart state

function Checkout() {
  const { cart, removeFromCart } = useContext(CartContext); // Access cart state and functions from context

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    console.log("Order Submitted: ", formData);
  }

  function getTotalPrice(cart) {
    return cart.reduce((total, item) => {
      return total + item.price; // assuming each item has a price and quantity
    }, 0);
  }

  return (
    <>
      <Header />
      <div className="checkout-container">
        {/* <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Order Summary</h3>
            <div className="order-summary">
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="cart-item mb-3 p-3 border d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <div className="cart-title">{item.name}</div>
                        <div className="cart-item-price">
                          Price: ${item.price / 100}
                        </div>
                        <img
                          src={`http://127.0.0.1:8000/images/${item.image}`}
                          className="cart-img align-items-right"
                          alt={item.name}
                        />
                      </div>
                    </div>
                  ))}
                  <h3 className="cart-total">
                    Total: ${getTotalPrice(cart) / 100}
                  </h3>
                </>
              )}
            </div>
          </div> */}

        {/* Payment Information */}
        <form>
          <div className="form-section">
            <h3>Payment Information</h3>
            <div>
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit">Place Order</button>
        </form>
      </div>
    </>
  );
}

export default Checkout;
