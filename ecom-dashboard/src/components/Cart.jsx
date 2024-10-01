import { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  function getTotalPrice() {
    return cart.reduce((total, item) => total + item.price, 0);
  }

  return (
    <>
      <Header></Header>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="cart card p-4 shadow-lg">
          <h2 className="header mb-4">Your Cart</h2>
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
                  <button
                    className="btn btn-danger cart-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <h3 className="cart-total">Total: ${getTotalPrice() / 100}</h3>
              <button
                className="btn btn-warning mt-3 cart-clear-button"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <Link to="/checkout" className="btn btn-primary checkout-in-cart">
                Checkout
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
