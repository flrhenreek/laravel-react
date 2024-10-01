import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ProductInfo from "./components/ProductInfo.jsx";
import Cart from "./components/Cart.jsx";
import CartProvider from "./components/CartContext.jsx";
import Checkout from "./components/Checkout.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Q4HH5B9lJ5wEY6b0MiaDn6ackNmhBd8wksN4L5L3vDZ9xksCZBbROaRpc8yeBeg39nTyJrj1dgIyUrUlDwJ0wjA00cdq2bxZR"
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/product-info/:productId",
    element: <ProductInfo />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: (
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
    </CartProvider>
  </StrictMode>
);
