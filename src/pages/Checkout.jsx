import { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "./css/Checkout.css";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const { authUser } = useAuth();
  const [payment,setPayment]=useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    if (authUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: authUser.username || "",
        email: authUser.email || "",
      }));
    }
  }, [authUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(payment === null ){
      toast.error("please select payment method");
      return
    } 
    if (!authUser) return alert("Login first");
    if (cart.length === 0) return alert("Cart empty");

    const order = {
      userId: authUser.id,
      customer: formData,
      items: cart,
      total: subtotal,
      status: "Pending",
      createdAt: new Date().toISOString(),
      payment : payment
    };

    try {
      await axios.post("http://localhost:3000/order", order);

      clearCart();

  
      setFormData({
        fullName: authUser.username || "",
        email: authUser.email || "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
      });

      toast.success("Order placed succesfully")
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <Navbar />

      <div className="checkout-container">

        
        <form onSubmit={handleSubmit}>
          <h2>Billing Details</h2>

          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            required
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            required
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            required
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            required
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            value={formData.city}
            required
            onChange={handleChange}
          />

          <input
            name="state"
            placeholder="State"
            value={formData.state}
            required
            onChange={handleChange}
          />

          <input
            name="zip"
            placeholder="ZIP"
            value={formData.zip}
            required
            onChange={handleChange}
          />
          <div className="payment-group">
                <label>
                  <input type="radio" name="paymentMethod"  onChange={()=>setPayment("COD")} />
                  Cash on Delivery
                </label>

                <label>
                  <input type="radio" name="paymentMethod" onChange={()=>setPayment("Google Pay")} />
                  Google Pay
                </label>

                <label>
                  <input type="radio" name="paymentMethod"  onChange={()=>setPayment("PhonePe")} />
                  PhonePe
                </label>
              </div>
              
          <button type="submit">Place Order</button>
        </form>

        
        <div className="order-summary">
          <h2>Order Summary</h2>

          {cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))
          )}

          <h3>Total: ₹{subtotal}</h3>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default Checkout;