"use client"

import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import styles from "./Auth.module.css"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { register } = useAuth()
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(username, email, password)
      history.push("/login")
    } catch (error) {
      setError("Registration failed. Please try again.")
    }
  }

  return (
    <div className={styles.authContainer}>
      <h2>Register</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.authInput}
        />
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
          Register
        </button>
      </form>
    </div>
  )
}

export default Register

