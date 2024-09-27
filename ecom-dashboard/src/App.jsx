import "./App.css";
import Header from "./components/Header";
import Product from "./components/Product";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // State to store products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch products from Laravel API when component mounts
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products") // Update with your Laravel API URL
      .then((response) => {
        setProducts(response.data); // Store the fetched products in state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError("Failed to load products."); // Handle error
        setLoading(false);
      });
  }, []);

  // Display error message
  if (error) {
    return <div className="text-center mt-4 text-danger">{error}</div>;
  }

  return (
    <>
      <Header></Header>
      <div className="container mt-4">
        <h1 className="text-center mb-4" style={{ color: "white" }}>
          <u>Products</u>
        </h1>
        <div className="row">
          {products.map((product) => (
            <div
              className="col-md-3 mb-4 d-flex justify-content-center"
              key={product.id}
            >
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
