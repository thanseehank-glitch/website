import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import { toast } from "react-toastify";
import "./css/order.css"

function Orders() {
  const { authUser } = useAuth();
  const { addToCart } = useCart();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    if (!authUser) return;

    axios
      .get(`http://localhost:3000/order?userId=${authUser.id}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, [authUser]);

  
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  
  const handleBuyAgain = (product, qty) => {
    if (!product) return;

    addToCart({
      ...product,
      qty: qty
    });


    toast.success("Added to cart again!");

  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="orders-container">
        <h2 className="orders-title">My Orders</h2>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">

              <div className="order-header">
                <div className="header-info">
                  <span className="label">Order Placed</span>
                  <span className="value">{order.date}</span>
                </div>
                <div className="header-info">
                  <span className="label">Order ID</span>
                  <span className="value">#{order.id}</span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => {
                  const product = products.find(
                    (p) => p.id === item.productId
                  );

                  if (!product) return null;

                  return (
                    <div key={index} className="order-product">
                      <div className="product-image-container">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product-image"
                        />
                      </div>

                      <div className="product-info">
                        <h4 className="product-name">{product.name}</h4>
                        <p className="product-price">₹{product.price.toLocaleString("en-IN")}</p>
                        <p className="product-qty">Qty: {item.quantity}</p>
                      </div>

                      <div className="product-actions">
                        <button
                          className="buy-again-btn"
                          onClick={() => handleBuyAgain(product, item.qty)}
                        >
                          Buy Again
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="order-footer">
                <h3>Total: ₹{order.total.toLocaleString("en-IN")}</h3>
              </div>

            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Orders;