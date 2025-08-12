import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Input from "../../components/input/Input"
import AuthLayout from "../../components/layout/AuthLayout"
import { UserContext } from "../../context/UserContext"
import { API_PATHS } from "../../utils/apiPaths"
import axiosInstance from "../../utils/axiosInstance"
import { validateEmail } from "../../utils/helper"

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { updateUser } = useContext(UserContext)

  const handleLogin = async (event) => {
    event.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter a valid password")
      return
    }

    setError("")

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      })
      const { token, role } = response.data

      if (token) {
        localStorage.setItem("token", token)
        updateUser(response.data)

        if (role === "Admin") {
          navigate("/admin/dashboard")
        } else {
          navigate("/user/dashboard")
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  return (
    <AuthLayout>
      <div className="flex h-3/4 flex-col justify-center md:h-full lg:w-[70%]">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="mt-[10px] mb-6 text-xs text-slate-700">
          Please enter your details to login
        </p>
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            label="Email Address"
            placeholder="john@example.com"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Min 8 characters"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          {error && <p className="pb-2.5 text-xs text-red-500">{error}</p>}
          <button type="submit" className="btn-primary uppercase">
            Login
          </button>
          <p className="mt-3 text-[13px] text-slate-800">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
