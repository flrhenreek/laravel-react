import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import Header from "./Header";

export default function ProductInfo() {
  const { productId } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/products/${productId}`
        );
        setProduct(response.data); // Assuming response.data contains the product object
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>; // Handle loading state
  }

  const imageUrl = `http://127.0.0.1:8000/images/${product.image}`;

  return (
    <>
      <Header></Header>
      <div className="container mt-4">
        <div className="product-info">
          <div className="row">
            <div className="col-sm-3">
              <img
                src={imageUrl}
                className="product-info-img"
                alt={product.name}
              />
            </div>
            <div className="col-sm-9">
              <h5 className="product-info-title">{product.name}</h5>
              <p className="product-info-desc">{product.description}</p>
              <p className="product-info-price">${product.price / 100}</p>
              <button
                className="btn btn-primary product-info-button"
                onClick={() => {
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                  });
                }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
