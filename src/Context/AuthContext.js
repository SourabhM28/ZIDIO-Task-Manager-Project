"use client"

import { createContext, useState, useContext, useEffect } from "react"
import api from "../utils/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await api.get("/users/me")
      setUser(response.data)
    } catch (error) {
      console.error("Error fetching user:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password })
    const { token, user } = response.data
    localStorage.setItem("token", token)
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    setUser(user)
  }

  const register = async (username, email, password) => {
    await api.post("/auth/register", { username, email, password })
  }

  const logout = () => {
    localStorage.removeItem("token")
    delete api.defaults.headers.common["Authorization"]
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

