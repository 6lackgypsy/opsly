import { useEffect, useState } from "react"
import { LuUsers } from "react-icons/lu"
import { API_PATHS } from "../../utils/apiPaths"
import axiosInstance from "../../utils/axiosInstance"
import AvatarGroup from "../AvatarGroup"
import Modal from "../Modal"

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tempSelectedUsers, setTempSelectedUsers] = useState([])

  useEffect(() => {
    getAllUsers()
  }, [])

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([])
    }

    return () => {}
  }, [selectedUsers])

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS)

      if (response.data.length > 0) {
        setAllUsers(response.data)
      }
    } catch (error) {
      console.error("Error fetching users", error)
    }
  }

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    )
  }

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers)
    setIsModalOpen(false)
  }

  const selectUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl)

  return (
    <div className="mt-2 space-y-4">
      {selectUserAvatars.length === 0 && (
        <button className="card-btn" onClick={() => setIsModalOpen(true)}>
          <LuUsers className="text-sm" /> Add Members
        </button>
      )}
      {selectUserAvatars.length > 0 && (
        <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <AvatarGroup avatars={selectUserAvatars} maxVisible={3} />
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        <div className="h-[60vh] space-y-4 overflow-y-auto">
          {allUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 border-b border-gray-200 p-3"
            >
              <img
                src={user.profileImageUrl}
                alt={user.name}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-white">
                  {user.name}
                </p>
                <p className="text-[13px] text-gray-500">{user.email}</p>
              </div>
              <input
                type="checkbox"
                className="text-primary h-4 w-4 cursor-pointer rounded-sm border-gray-300 bg-gray-100 outline-none"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <button
            className="card-btn uppercase"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button className="card-btn-fill uppercase" onClick={handleAssign}>
            DONE
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default SelectUsers
