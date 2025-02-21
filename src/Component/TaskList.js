import { Link } from "react-router-dom"
import { useTask } from "../contexts/TaskContext"
import styles from "./TaskList.module.css"

const TaskList = () => {
  const { tasks, loading, deleteTask } = useTask()

  if (loading) {
    return <div>Loading tasks...</div>
  }

  return (
    <div className={styles.taskList}>
      <h2>Tasks</h2>
      <Link to="/tasks/new" className={styles.createTaskButton}>
        Create New Task
      </Link>
      {tasks.map((task) => (
        <div key={task._id} className={styles.taskCard}>
          <h3>{task.title}</h3>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
          <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
          <div className={styles.taskActions}>
            <Link to={`/tasks/${task._id}`} className={styles.viewButton}>
              View
            </Link>
            <button onClick={() => deleteTask(task._id)} className={styles.deleteButton}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList

