import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./SignUp.css"
import { toast } from "react-toastify"

function SignUp() {
  const Navigate = useNavigate()
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState({})

  function handleInput(e) {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError({});
  }
  function validateform() {
    let Newerror = {}
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordRegex = /^.{6,}$/;
    if (input.username === "" || input.username === null) {
      Newerror.user = "user name required"
    }
    if (!input.email) {
      Newerror.email = "Email is required";
    } else if (!emailRegex.test(input.email)) {
      Newerror.email = "Invalid email format";
    }
    if (!input.password) {
      Newerror.password = "Password is required";
    } else if (!passwordRegex.test(input.password)) {
      Newerror.password = "Password must be at least 6 characters";
    }

    setError(Newerror);
    return Object.keys(Newerror).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validateform ) {
      return;
    }

    try {
      const res = await axios.get("http://localhost:3000/users")
      const users = res.data
      if (users.find(user => user.email === input.email)) {
        setError({ email: "Email already exists" });
        return;
      }
      await axios.post("http://localhost:3000/users", {
        ...input,
      });
      setInput({ username: "", email: "", password: "" });
      setError({});
      toast.success("Registration successful!");

      Navigate("/login")


    } catch (error) {
      console.error("Error registering user:", error);
      setError({ general: "Server error, please try again" })
    }

  }
  return (
    <div className="main-continer">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Create Account</h2>
        {error.general && <p className="error-message general-error">{error.general}</p>}
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Enter-userName"
            value={input.username}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Enter-email"
            value={input.email}
            onChange={handleInput}
          />
          {error.email && <p className="error-message">{error.email}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter-password"
            value={input.password}
            onChange={handleInput}
          />
          {error.password && <p className="error-message">{error.password}</p>}
        </div>

        <button className="signup-btn" type="submit">Register</button>
        <p className="redirect-text">
          Already have an account? <span className="redirect-link" onClick={() => Navigate("/Login")}>Login here</span>
        </p>
      </form>
    </div>
  )
}

export default SignUp
