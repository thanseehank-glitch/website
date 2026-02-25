import { useCart } from "../Context/CartContext";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import "./css/Cart.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="empty-cart">
          <ShoppingBag size={64} className="empty-cart-icon" />
          <h2 className="empty-cart-title">Your Bag is Empty</h2>
          <p className="empty-cart-text">
            Looks like you haven't picked up any items yet.
          </p>
          <Link to="/product" className="empty-cart-button">
            New Collections Arrivals
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="cart-page">
        <h1 className="cart-title">Your Locker</h1>

        <div className="cart-grid">
          <div className="cart-items-section">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-info">
                  <div>
                    <p className="cart-item-brand">{item.brand}</p>
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">₹{item.price}</p>
                  </div>

                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="quantity-button"
                      >
                        <Minus size={8} />
                      </button>

                      <span className="quantity-display">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="quantity-button"
                      >
                        <Plus size={8} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-button"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/product" className="continue-shopping">
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>

          <div className="summary-section">
            <div className="summary-card">
              <h2 className="summary-title">Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <Link to="/checkout">
                <button className="checkout-button">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;