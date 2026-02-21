import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../Context/AuthContext";
import { CiUser } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "../../Context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { authUser, logout } = useAuth();
  const [Dropdown, setDropdown] = useState(false);
  const { cart } = useCart();

  const handleLogout = () => {
    logout();
    setDropdown(false);
    navigate("/");
  };

  return (
    <div>
      <nav className="Navbar">
        
        <div>
          <ul className="nav-left">
            <li>
              <NavLink to="/product">Collections</NavLink>
            </li>
            <li>
              <NavLink to="/order">Order</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </div>

      
        <div className="logo-center" onClick={() => navigate("/")}>
          <h1>ZIVORA</h1>
        </div>

        <div className="nav-right">
        

          <div className="cart-continer">
            <NavLink to="/cart">
              <CiShoppingCart />
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </NavLink>
          </div>

        
          {authUser ? (
            <div className="profile-container">
              <div
                className="profile-trigger"
                onClick={() => setDropdown(!Dropdown)}
              >
                <CiUser className="user-icon" />
                <FaChevronDown
                  className={`arrow-icon ${Dropdown ? "rotate" : ""}`}
                />
              </div>

              {Dropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-item">
                    <h3>{authUser.name}</h3>
                    <p>{authUser.email}</p>
                  </div>

                  <div
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="login-btn"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;