"use client"

import { createContext, useState, useContext, useEffect } from "react"
import api from "../utils/api"

const TaskContext = createContext()

export const useTask = () => useContext(TaskContext)

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks")
      setTasks(response.data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (taskData) => {
    const response = await api.post("/tasks", taskData)
    setTasks([...tasks, response.data])
    return response.data
  }

  const updateTask = async (id, taskData) => {
    const response = await api.patch(`/tasks/${id}`, taskData)
    setTasks(tasks.map((task) => (task._id === id ? response.data : task)))
    return response.data
  }

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`)
    setTasks(tasks.filter((task) => task._id !== id))
  }

  const value = {
    tasks,
    loading,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

