"use client"

import { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useTask } from "../contexts/TaskContext"
import styles from "./TaskDetails.module.css"

const TaskDetails = () => {
  const { id } = useParams()
  const history = useHistory()
  const { tasks, updateTask, deleteTask } = useTask()
  const [task, setTask] = useState(null)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const foundTask = tasks.find((t) => t._id === id)
    if (foundTask) {
      setTask(foundTask)
    } else {
      history.push("/tasks")
    }
  }, [id, tasks, history])

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await updateTask(id, task)
      setEditing(false)
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTask(id)
      history.push("/tasks")
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  if (!task) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.taskDetails}>
      <h2>{editing ? "Edit Task" : "Task Details"}</h2>
      {editing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className={styles.formInput}
          />
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className={styles.formTextarea}
          />
          <select
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            className={styles.formSelect}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            value={task.deadline.split("T")[0]}
            onChange={(e) => setTask({ ...task, deadline: e.target.value })}
            className={styles.formInput}
          />
          <button type="submit" className={styles.submitButton}>
            Save Changes
          </button>
          <button type="button" onClick={() => setEditing(false)} className={styles.cancelButton}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>
            <strong>Title:</strong> {task.title}
          </p>
          <p>
            <strong>Description:</strong> {task.description}
          </p>
          <p>
            <strong>Status:</strong> {task.status}
          </p>
          <p>
            <strong>Priority:</strong> {task.priority}
          </p>
          <p>
            <strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}
          </p>
          <button onClick={() => setEditing(true)} className={styles.editButton}>
            Edit
          </button>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default TaskDetails

