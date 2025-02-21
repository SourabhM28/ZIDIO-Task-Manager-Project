import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { TaskProvider } from "./contexts/TaskContext"
import PrivateRoute from "./components/PrivateRoute"
import Header from "./components/Header"
import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import TaskDetails from "./components/TaskDetails"
import styles from "./App.module.css"

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <div className={styles.app}>
            <Header />
            <main className={styles.main}>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/tasks" component={TaskList} />
                <PrivateRoute path="/tasks/new" component={TaskForm} />
                <PrivateRoute path="/tasks/:id" component={TaskDetails} />
                <Redirect to="/" />
              </Switch>
            </main>
          </div>
        </Router>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App

