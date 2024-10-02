import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div class="container">
      <hr />
      <div class="row">
        <div class="col-12 col-lg-4">
          <figure>
            <img src="/cica_shop.png" alt="logo"></img>
          </figure>
          <div>
            <h5>
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ marginRight: "5px" }}
              />
              d.henrik70@gmail.com
            </h5>
          </div>
        </div>
        <div class="col-12 col-lg-2 text-gray-600">
          <h5>
            <b>Fast Links</b>
          </h5>
          <p>
            <Link to="/cart">Cart</Link>
          </p>
          <p>
            <Link to="/checkout">Checkout</Link>
          </p>
          <p>
            <Link to="/">Wishlist</Link>
          </p>
        </div>
        <div class="col-12 col-lg-2">
          <h5>
            <b>Contact Details</b>
          </h5>
          <p>
            <Link to="/contact">Contact us</Link>
          </p>
        </div>
        <div class="col-12 col-lg-4">
          <h5>
            <b>Docs</b>
          </h5>
          <p>
            <Link to="/">Terms of Service</Link>
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Footer;
