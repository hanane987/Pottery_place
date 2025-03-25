"use client"

import { useState } from "react"
import axios from "axios"
import { User, Mail, Lock, UserPlus, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"
import styles from "../../styles/Login.module.css"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("acheteur")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError("All fields are required")
      return
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password, role })
      alert("Registration successful")
      navigate("/login")
    } catch (err) {
      setError("Error registering user")
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
          <p>Create your account</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
            <User className={styles.inputIcon} size={18} />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div className={styles.inputGroup}>
            <Users className={styles.inputIcon} size={18} />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="acheteur">Acheteur</option>
              <option value="vendeur">Vendeur</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className={styles.loginButton}>
            <UserPlus size={18} />
            <span>Create Account</span>
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.registerLink}>
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  )
}

export default Register

