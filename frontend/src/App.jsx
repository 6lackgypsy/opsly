import { useContext } from "react"
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom"
import UserProvider, { UserContext } from "./context/UserContext"
import CreateTask from "./pages/admin/CreateTask"
import { default as Dashboard } from "./pages/admin/Dashboard"
import ManageTasks from "./pages/admin/ManageTasks"
import ManageUsers from "./pages/admin/ManageUsers"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import MyTasks from "./pages/user/MyTasks"
import UserDashboard from "./pages/user/UserDashboard"
import ViewTaskDetails from "./pages/user/ViewTaskDetails"
import PrivateRoute from "./routes/PrivateRoute"

const Root = () => {
  const { user, loading } = useContext(UserContext)

  if (loading) {
    return <Outlet />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return user.role === "Admin" ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/user/dashboard" replace />
  )
}

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={<PrivateRoute />}
              allowedRoles={["admin"]}
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tasks" element={<ManageTasks />} />
              <Route path="create-task" element={<CreateTask />} />
              <Route path="users" element={<ManageUsers />} />
            </Route>

            {/* USer Routes */}
            <Route
              path="/user"
              element={<PrivateRoute allowedRoles={["admin"]} />}
            >
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="tasks" element={<MyTasks />} />
              <Route path="task-details/:id" element={<ViewTaskDetails />} />
            </Route>

            {/* Default Route */}
            <Route path="/" element={<Root />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  )
}

export default App
