import { useState, useEffect } from "react";
import axios from "axios";
import "./css/AdminDashboard.css";

function AdminDashboard() {
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {

    try {
      axios.get("http://localhost:3000/users")
        .then((res) => setUser(res.data))
      axios.get("http://localhost:3000/products")
        .then((res) => setProduct(res.data))
      axios.get("http://localhost:3000/order")
        .then((res) => setOrder(res.data))
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    }

  }, []);


  const Users = user.filter((item) => item.role !== "admin");


  const totalRevenue = order.reduce((acc, item) => acc + item.total, 0);


  const recentOrders = [...order].reverse().slice(0, 5);
  console.log(recentOrders)

  return (
    <div className="admin-dashboard">

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Revenue</h4>
          <p className="stat-value">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h4>Active Users</h4>
          <p className="stat-value">{Users.length}</p>
        </div>
        <div className="stat-card">
          <h4>Total Products</h4>
          <p className="stat-value">{product.length}</p>
        </div>
        <div className="stat-card">
          <h4>Orders</h4>
          <p className="stat-value">{order.length}</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-orders-container">
          <h3>Last 5 Orders</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>order Id</th>
                <th>Customer</th>
                <th>date</th>
                <th>payment</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((ord) => (
                <tr key={ord.id}>
                  <td>{ord.id}</td>
                  <td>
                    <strong>{ord.customer.fullName}</strong>
                    <br />
                    <small>{ord.customer.city}</small>
                  </td>
                  <td>{ord.orderDate}</td>
                  <td>{ord.payment}</td>
                  <td>₹{ord.totalAmount}</td>
                  <td>
                    <span className={`status-pill ${ord.status.toLowerCase()}`}>
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;