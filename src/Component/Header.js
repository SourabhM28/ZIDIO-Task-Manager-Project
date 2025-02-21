import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import styles from "./Header.module.css"

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className={styles.header}>
      <div className={styles.logo}>ZIDIO Task Management</div>
      <nav className={styles.nav}>
        {user ? (
          <>
            <Link to="/" className={styles.navLink}>
              Dashboard
            </Link>
            <Link to="/tasks" className={styles.navLink}>
              Tasks
            </Link>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
            <Link to="/register" className={styles.navLink}>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header

