import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { LuFileSpreadsheet } from "react-icons/lu"
import UserCard from "../../components/card/UserCard"
import DashboardLayout from "../../components/layout/DashboardLayout"
import { API_PATHS } from "../../utils/apiPaths"
import axiosInstance from "../../utils/axiosInstance"

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    getAllUsers()

    return () => {}
  }, [])

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS)

      if (response.data?.length > 0) {
        setAllUsers(response.data)
      }
    } catch (error) {
      console.error("Error fetching users", error)
    }
  }

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob",
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")

      link.href = url
      link.setAttribute("download", "user_details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting users summary", error)
      toast.error("Error exporting users summary. Please try again")
    }
  }

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        <div className="flex justify-between md:items-center">
          <h2 className="text-xl font-medium md:text-xl">Team Members</h2>
          <button className="download-btn flex" onClick={handleDownloadReport}>
            <LuFileSpreadsheet className="text-lg" />
            Download Report
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {allUsers.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageUsers
