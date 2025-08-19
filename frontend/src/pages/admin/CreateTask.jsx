import moment from "moment"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { LuTrash2 } from "react-icons/lu"
import { useLocation, useNavigate } from "react-router-dom"
import DeleteAlert from "../../components/DeleteAlert"
import AddAttachmentInput from "../../components/input/AddAttachmentInput"
import SelectDropdown from "../../components/input/SelectDropdown"
import SelectUsers from "../../components/input/SelectUsers"
import TodoListInput from "../../components/input/TodoListInput"
import DashboardLayout from "../../components/layout/DashboardLayout"
import Modal from "../../components/Modal"
import { API_PATHS } from "../../utils/apiPaths"
import axiosInstance from "../../utils/axiosInstance"
import { PRIORITY_DATA } from "../../utils/data"

const CreateTask = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { taskId } = location.state || {}

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  })
  const [currentTask, setCurrentTask] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)

  useEffect(() => {
    if (taskId) {
      getTaskDetails(taskId)
    }

    return () => {}
  }, [taskId])

  const getTaskDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK(taskId))

      if (response.data) {
        const taskInfo = response.data

        setCurrentTask(taskInfo)
        setTaskData((prev) => ({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => item?._id || []),
          todoChecklist: taskInfo?.todoChecklist?.map(
            (item) => item?.text || [],
          ),
          attachments: taskInfo?.attachments || [],
        }))
      }
    } catch (error) {
      console.error("Error fetching user", error)
    }
  }

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }))
  }

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    })
  }

  const createTask = async () => {
    setLoading(true)

    try {
      const todoList = taskData.todoChecklist.map((item) => ({
        text: item,
        completed: false,
      }))

      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todoList,
      })

      toast.success("Task Created Successfully")
      clearData()
    } catch (error) {
      console.error("Error creating task", error)
    } finally {
      setLoading(false)
    }
  }

  const updateTask = async () => {
    setLoading(true)

    try {
      const todoList = taskData.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist || []
        const matchedTask = prevTodoChecklist.find((task) => task.text === item)

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        }
      })

      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK(taskId),
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoChecklist: todoList,
        },
      )

      toast.success("Task updated successfully")
    } catch (error) {
      console.error("Error updating task", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    setError(null)

    if (!taskData.title.trim()) {
      setError("Title is required")
      return
    }

    if (!taskData.description.trim()) {
      setError("Description is required")

      return
    }

    if (!taskData.dueDate) {
      setError("Due date is required")

      return
    }

    if (taskData.assignedTo?.length === 0) {
      setError("Assign at least one member to task")

      return
    }

    if (taskData.todoChecklist?.length === 0) {
      setError("Add at least one todo to task")

      return
    }

    if (taskId) {
      updateTask()

      return
    }

    createTask()
  }

  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId))

      setOpenDeleteAlert(false)
      toast.success("Task deleted Successfully")
      navigate("/admin/tasks")
    } catch (error) {
      console.error(
        "Error deleting task",
        error.response?.data.message || error.message,
      )
    }
  }

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium md:text-xl">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className="flex cursor-pointer items-center gap-1.5 rounded border border-rose-100 bg-rose-50 px-2 py-1 text-[13px] font-medium text-rose-500 hover:border-rose-300"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" /> Delete
                </button>
              )}
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>
              <input
                type="text"
                placeholder="Create App UI"
                className="form-input"
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Description
              </label>
              <textarea
                placeholder="Describe task"
                rows={4}
                className="form-input"
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              ></textarea>
            </div>
            <div className="mt-2 grid grid-cols-12 gap-4">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Priority
                </label>
                <SelectDropdown
                  placeholder="Priority"
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                />
              </div>
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  type="date"
                  placeholder="Create App UI"
                  className="form-input"
                  value={taskData.dueDate || ""}
                  onChange={({ target }) =>
                    handleValueChange("dueDate", target.value)
                  }
                />
              </div>
              <div className="col-span-12 md:col-span-3">
                <label className="text-xs font-medium text-slate-600">
                  Assign To
                </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) =>
                    handleValueChange("assignedTo", value)
                  }
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                TODO Checklist
              </label>
              <TodoListInput
                todoList={taskData?.todoChecklist}
                setTodoList={(value) =>
                  handleValueChange("todoChecklist", value)
                }
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Add Attachments
              </label>
              <AddAttachmentInput
                attachments={taskData?.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>
            {error && (
              <p className="mt-5 text-xs font-medium text-red-500">{error}</p>
            )}
            <div className="mt-7 flex justify-end">
              <button
                className="add-btn uppercase"
                disabled={loading}
                onClick={handleSubmit}
              >
                {taskId ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={deleteTask}
        />
      </Modal>
    </DashboardLayout>
  )
}

export default CreateTask
