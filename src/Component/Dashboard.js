import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useTask } from "../contexts/TaskContext"
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  const { user } = useAuth()
  const { tasks } = useTask()

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "Completed").length
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length

  return (
    <div className={styles.dashboard}>
      <h1>Welcome, {user.username}!</h1>
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Completed Tasks</h3>
          <p>{completedTasks}</p>
        </div>
        <div className={styles.statCard}>
          <h3>In Progress Tasks</h3>
          <p>{inProgressTasks}</p>
        </div>
      </div>
      <Link to="/tasks/new" className={styles.createTaskButton}>
        Create New Task
      </Link>
    </div>
  )
}

export default Dashboard

