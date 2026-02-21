import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "./Login.css"
import { useAuth } from '../../Context/AuthContext'
function Login() {
  const { Login, } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  function handleInput(e) {
    const { name, value } = e.target
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (!user.email || !user.password) {
      setError("All fields are required")
      return
    }

    try {
      const response = await axios.get(`http://localhost:3000/users?email=${user.email}`)

      if (response.data.length === 0) {
        setError("Email is not registered")
        return
      }

      const store = response.data[0] 

      if (store.status === "blocked") {
        setError("Your account has been blocked");
        toast.error("Access Denied: Account Blocked");
        return;
      }
      if (store.password !== user.password) {
        setError("Incorrect password")
        return
      }

      Login({
        id: store.id,
        name: store.username,
        email: store.email,
        role: store.role,
        isLoggedin: true,
      })

      toast.success("Login successful")
      navigate("/")
    } catch (error) {
      console.log(error, "server")
      setError("Server error. Please try again.")
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>

        <div className="input-group">
          <label className="input-label">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="input-field"
            name="email"
            value={user.email}
            onChange={handleInput}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="input-field"
            name="password"
            value={user.password}
            onChange={handleInput}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="button-group">
          <button type="submit" className="login-button">Login</button>
        </div>
        <p className="redirect-text">
          Don't have an account?{" "}
          <span className="redirect-link" onClick={() => navigate("/signup")}>
            Register here
          </span>
        </p>
      </form>


    </div>
  )
}

export default Login

  