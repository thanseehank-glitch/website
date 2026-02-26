import axios from "axios"
import { useState, useEffect } from "react"
import "./css/AdminOrder.css"
function AdminOrders() {
  const [order, setOrder] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/order")
      .then((res) => setOrder(res.data))
      .catch((error) => console.log("order error", error))
  }, [])

  const handilStatus = async (id, currentStatus) => {
    try {
      await axios.patch(`http://localhost:3000/order/${id}`, {
        status: currentStatus
      })
      setOrder(order.map((ord) => ord.id === id ? { ...ord, status: currentStatus } : ord))
    } catch (error) {
      console.log("failled", error)
    }
  }

  const Orders = order.filter(order =>
    order.customer.fullName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2 className="orders-title">Order Management</h2>

        <input
          type="text"
          placeholder="Search by customer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="orders-search"
        />
      </div>

      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr className="orders-table-head">
              <th>Customer</th>
              <th>Phone</th>
              <th>City</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {Orders.length > 0 ? (
              Orders.map((order) => (
                <tr className="orders-row" key={order.id}>
                  <td className="orders-cell">
                    {order.customer.fullName}
                  </td>
                  <td className="orders-cell">
                    {order.customer.phone}
                  </td>
                  <td className="orders-cell">
                    {order.customer.city}
                  </td>
                  <td className="orders-cell total-amount">
                    ₹{order.total}
                  </td>
                  <td className="orders-cell payment-method">
                    {order.payment}
                  </td>

                  <td className="orders-cell">
                    <select
                      className={`status-select status-${order.status.toLowerCase()}`}
                      value={order.status}
                      onChange={(e) =>
                        handilStatus(order.id, e.target.value)
                      }
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="orders-cell order-date">
                    {order.orderDate}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data-cell">
                  <div className="empty-state">
                    <p>No orders found.</p>
                    
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminOrders