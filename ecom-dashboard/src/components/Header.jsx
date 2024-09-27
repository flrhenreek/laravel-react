import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container d-flex justify-content-center">
          <div className="container">
            <div className="row" style={{ height: 50 }}>
              <div className="col-sm-11 d-flex justify-content-center align-items-center">
                <Link
                  to="/"
                  className="navbar-brand"
                  style={{ color: "white" }}
                >
                  Vendor Source
                </Link>
              </div>
              <div className="col-sm-1 d-flex justify-content-center align-items-center">
                <Link to="/cart" className="nav-link">
                  Cart
                  <FontAwesomeIcon icon={faCartShopping} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
