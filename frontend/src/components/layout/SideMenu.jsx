import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data"

const SideMenu = ({ activeMenu }) => {
  const navigate = useNavigate()

  const { user, clearUser } = useContext(UserContext)

  const [sideMenuData, setSideMenuData] = useState([])

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === "Admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA,
      )
    }

    return () => {}
  }, [user])

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout()

      return
    }

    navigate(route)
  }

  const handleLogout = () => {
    localStorage.clear()
    clearUser()
    navigate("/login")
  }

  return (
    <div className="sticky top-[61px] z-20 h-[calc(100vh-61px)] w-64 border-r border-gray-200/50 bg-white">
      <div className="mb-7 flex flex-col items-center justify-center pt-5">
        <div className="relative">
          <img
            src={user?.profileImageUrl || null}
            alt="Profile image"
            className="h-20 w-20 rounded-full bg-slate-400"
          />
        </div>
        {user?.role === "Admin" && (
          <div className="bg-primary mt-1 rounded px-3 py-0.5 text-[10px] font-medium text-white">
            Admin
          </div>
        )}
        <h5 className="mt-3 leading-6 font-medium text-gray-950">
          {user?.name || ""}
        </h5>
        <p className="text- [12px] text-gray-500">{user?.email || ""}</p>
      </div>
      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`mb-3 flex w-full cursor-pointer items-center gap-4 px-6 py-3 text-[15px] ${activeMenu === item.label ? "text-primary border-r-3 bg-linear-to-r from-blue-50/40 to-blue-100/50" : ""} `}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default SideMenu
