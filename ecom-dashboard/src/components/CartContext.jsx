import { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

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
    console.log(`Adding product: ${JSON.stringify(product)}`); // Log the product being added
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
      let updatedCart;
      if (itemExists) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id ? { ...item } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product }];
      }
      console.log("Updated cart state:", updatedCart); // Log updated cart state
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

  // Calculate the total price of items in the cart in cents
  const cartTotal = cart.reduce((total, item) => {
    console.log(`Item price: ${item.price}`); // Log each item's price
    return total + item.price;
  }, 0); // Assuming item.price is in cents

  console.log(`Cart total (in cents): ${cartTotal}`); // Log the total amount in cents

  // Every time the cart state changes, save the updated cart to localStorage
  useEffect(() => {
    if (cart.length > 0) {
      saveCartToLocalStorage(cart);
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }} // Expose cartTotal
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
