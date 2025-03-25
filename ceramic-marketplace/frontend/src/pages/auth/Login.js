"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Mail, Lock, LogIn } from "lucide-react"
import styles from "../../styles/Login.module.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Email and password are required")
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address")
      return
    }
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password })
      localStorage.setItem("token", response.data.token)

      // Redirect based on user role
      const role = response.data.role
      if (role === "admin") {
        navigate("/admin-dashboard")
      } else if (role === "vendeur") {
        navigate("/vendor/dashboard")
      } else {
        navigate("/shop")
      }
    } catch (err) {
      setError("Invalid credentials")
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.formHeader}>
          <div className={styles.logoIcon}>
            <span className={styles.potteryWheel}></span>
          </div>
          <h2>Artisan Pottery</h2>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <Mail className={styles.inputIcon} size={18} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className={styles.inputGroup}>
            <Lock className={styles.inputIcon} size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.forgotPassword}>
            <a href="/forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className={styles.loginButton}>
            <LogIn size={18} />
            <span>Sign In</span>
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.registerLink}>
          Don't have an account? <a href="/register">Create one</a>
        </div>
      </div>
    </div>
  )
}

export default Login

