"use client"

import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useTask } from "../contexts/TaskContext"
import styles from "./TaskForm.module.css"

const TaskForm = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [deadline, setDeadline] = useState("")
  const { createTask } = useTask()
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createTask({ title, description, priority, deadline })
      history.push("/tasks")
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  return (
    <div className={styles.taskForm}>
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.formInput}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.formTextarea}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className={styles.formSelect}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
          className={styles.formInput}
        />
        <button type="submit" className={styles.submitButton}>
          Create Task
        </button>
      </form>
    </div>
  )
}

export default TaskForm

