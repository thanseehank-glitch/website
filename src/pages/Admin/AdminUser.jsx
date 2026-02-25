import axios from "axios"
import { useEffect, useState } from "react"
import "./css/AdminUser.css"
function AdminUsers() {
  const [user, setUser] = useState([])
  const [search, setSearch] = useState("")
  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then((res) => setUser(res.data))
  }, [])

  const filteredUsers = user.filter((item) => {
    const User = item.role !== "admin";
    const Search = item.username?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase());

    return User && Search;
  });

  const Status = async (id, currentStatus) => {
    const NewStatus = currentStatus === "active" ? "blocked" : "active"
    try {
      await axios.patch(`http://localhost:3000/users/${id}`, {
        status: NewStatus
      })

      setUser(user.map((item) => item.id === id ? { ...item, status: NewStatus } : item))
    } catch (error) {
      console.log("failled to update ")
    }
  }




  return (
    <div className="admin-users-container">
      <div className="admin-users-header">
        <h1 className="admin-users-title">User Management</h1>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-users-search"
        />
      </div>

      <div className="admin-users-table-wrapper">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((item) => (
                <tr key={item.id} className="admin-users-row">
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                    <span className={`status-badge status-${item.status}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => Status(item.id, item.status)}
                      className={`btn-status ${item.status === "active" ? "btn-block" : "btn-active"}`}
                    >
                      {item.status === "active" ? "Block" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-users">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUsers