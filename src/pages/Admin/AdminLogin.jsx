import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { Login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.get(
        `http://localhost:3000/users?email=${email}&password=${password}`
      );

      if (res.data.length === 0) {
        setError("Invalid email or password.");
        return;
      }

      const user = res.data[0];

      if (user.role !== "admin") {
        setError("You are not an admin.");
        navigate("/");
        return;
      }

      Login(user);
      navigate("/adminpanel/dashboard");

    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1 className="admin-title">Welcome Back Admin</h1>
        <p className="admin-subtitle">Login to manage your store</p>

        <form onSubmit={handleSubmit} className="admin-form">
          {error && <p className="admin-error">{error}</p>}

          <div className="admin-input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="admin-login-btn">
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;