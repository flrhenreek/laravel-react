import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Product({ product }) {
  const imageUrl = `http://127.0.0.1:8000/images/${product.image}`;
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <Link to={`/product-info/${product.id}`} className="custom-link">
        <img src={imageUrl} className="card-img-top" alt={product.name} />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-price">${product.price / 100}</p>
        <button
          className="btn"
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
  );
}
