"use client"

import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import styles from "./Auth.module.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      history.push("/")
    } catch (error) {
      setError("Invalid email or password")
    }
  }

  return (
    <div className={styles.authContainer}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.authInput}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.authInput}
        />
        <button type="submit" className={styles.authButton}>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login

