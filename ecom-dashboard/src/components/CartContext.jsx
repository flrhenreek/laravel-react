import { createContext, useState, useEffect } from "react";
export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load the cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    console.log("Loaded cart from localStorage:", savedCart); // Log what was loaded
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save the cart to localStorage
  function saveCartToLocalStorage(cartItems) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    console.log("Saved cart to localStorage:", cartItems); // Log the saved cart
  }

  // Add an item to the cart
  function addToCart(product) {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
      let updatedCart;
      if (itemExists) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product }];
      }
      saveCartToLocalStorage(updatedCart); // Save updated cart to localStorage
      return updatedCart;
    });
  }

  // Remove an item from the cart
  function removeFromCart(productId) {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      saveCartToLocalStorage(updatedCart); // Save updated cart to localStorage
      return updatedCart;
    });
  }

  // Clear the cart
  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart"); // Clear cart from localStorage
  }

  // Every time the cart state changes, save the updated cart to localStorage
  useEffect(() => {
    if (cart.length > 0) {
      saveCartToLocalStorage(cart);
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
