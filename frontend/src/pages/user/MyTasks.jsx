import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import TaskCard from "../../components/card/TaskCard"
import DashboardLayout from "../../components/layout/DashboardLayout"
import TaskStatusTabs from "../../components/TaskStatusTabs"
import { API_PATHS } from "../../utils/apiPaths"
import axiosInstance from "../../utils/axiosInstance"

const MyTasks = () => {
  const navigate = useNavigate()

  const [allTasks, setAllTasks] = useState([])
  const [tabs, setTabs] = useState([])
  const [filterStatus, setFilterStatus] = useState("All")

  useEffect(() => {
    getAllTasks(filterStatus)

    return () => {}
  }, [filterStatus])

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: { status: filterStatus === "All" ? "" : filterStatus },
      })

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : [])

      const statusSummary = response.data?.statusSummary || {}
      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pending || 0 },
        { label: "In Progress", count: statusSummary.inProgress || 0 },
        { label: "Completed", count: statusSummary.completed || 0 },
      ]

      setTabs(statusArray)
    } catch (error) {
      console.error("Error fetching users", error)
    }
  }

  const handleClick = (taskId) => {
    navigate(`/user/task-details/${taskId}`)
  }

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="my-5">
        <div className="flex flex-col justify-between lg:flex-row lg:items-center">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-medium md:text-xl">My Tasks</h2>
          </div>
          {tabs?.[0]?.count > 0 && (
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          )}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {allTasks?.map((item, index) => (
            <TaskCard
              key={item._id}
              title={item.title}
              description={item.description}
              priority={item.priority}
              status={item.status}
              progress={item.progress}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
              assignedTo={item.assignedTo?.map((item) => item.profileImageUrl)}
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTodoCount || 0}
              todoChecklist={item.todoChecklist || []}
              onClick={() => handleClick(item._id)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default MyTasks
