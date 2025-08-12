import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Input from "../../components/input/Input"
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector"
import AuthLayout from "../../components/layout/AuthLayout"
import { UserContext } from "../../context/UserContext"
import { API_PATHS } from "../../utils/apiPaths"
import axiosInstance from "../../utils/axiosInstance"
import { validateEmail } from "../../utils/helper"
import uploadImage from "../../utils/uploadImage"

const Signup = () => {
  const navigate = useNavigate()

  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [adminInviteToken, setAdminInviteToken] = useState("")
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)

  const handleSignUp = async (e) => {
    e.preventDefault()

    let profileImageUrl = ""

    if (!fullName) {
      setError("Please enter a valid full name")

      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")

      return
    }

    if (!password) {
      setError("Please enter a valid password")

      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")

      return
    }

    setError(null)

    try {
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic)

        profileImageUrl = imageUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken,
      })
      const { token, role } = response.data

      if (token) {
        localStorage.setItem("token", token)
        updateUser(response.data)
      }

      if (role === "Admin") {
        navigate("/admin/dashboard")
      } else {
        navigate("/user/dashboard")
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
      <div className="mt-10 flex h-auto flex-col justify-center md:mt-0 md:h-full lg:w-[100%]">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="mt-[5px] mb-6 text-xs text-slate-700">
          Join us today by entering your details below
        </p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              type="text"
              label="Full Name"
              placeholder="John"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />
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
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Min 8 characters"
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
            />
            <Input
              type="text"
              label="Admin Invite Token"
              placeholder="6 Digit Code"
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
            />
          </div>
          {error && <p className="pb-2.5 text-xs text-red-500">{error}</p>}
          <button type="submit" className="btn-primary uppercase">
            Sign Up
          </button>
          <p className="mt-3 text-[13px] text-slate-800">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup
