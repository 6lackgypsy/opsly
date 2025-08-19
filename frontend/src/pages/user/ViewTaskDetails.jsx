import moment from "moment"
import { useEffect, useState } from "react"
import { LuSquareArrowUpRight } from "react-icons/lu"
import { useParams } from "react-router-dom"
import AvatarGroup from "../../components/AvatarGroup"
import DashboardLayout from "../../components/layout/DashboardLayout"
import { API_PATHS } from "../../utils/apiPaths"
import axiosInstance from "../../utils/axiosInstance"

const ViewTaskDetails = () => {
  const { id } = useParams()

  const [task, setTask] = useState(null)

  useEffect(() => {
    if (id) {
      getTaskDetails()
    }

    return () => {}
  }, [])

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10"
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/10"
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10"
    }
  }

  const getTaskDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK(id))

      if (response.data) {
        const taskInfo = response.data

        setTask(taskInfo)
      }
    } catch (error) {
      console.error("Error fetching user", error)
    }
  }

  const updateTodoChecklist = async (index) => {
    const todoChecklist = [...task?.todoChecklist]
    const taskId = id

    if (todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed

      try {
        const response = await axiosInstance.put(
          API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
          { todoChecklist },
        )

        if (response.status === 200) {
          setTask(response.data?.task || task)
        } else {
          todoChecklist[index].completed = !todoChecklist[index].completed
        }
      } catch (error) {
        todoChecklist[index].completed = !todoChecklist[index].completed
        
      }
    }
  }

  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = `https://${link}`
    }

    window.open(link, "_blank")
  }

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {task && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4">
            <div className="form-card col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium md:text-xl">
                  {task?.title}
                </h2>
                <div
                  className={`rounded px-4 py-0.5 text-[11px] font-medium md:text-[13px] ${getStatusTagColor(task?.status)}`}
                >
                  {task?.status}
                </div>
              </div>
              <div className="mt-4">
                <InfoBox label="Description" value={task?.description} />
              </div>
              <div className="mt-4 grid grid-cols-12 gap-4">
                <div className="col-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={task?.priority} />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <InfoBox
                    label="Due Date"
                    value={
                      task?.dueDate
                        ? moment(task?.dueDate).format("Do MMM YYYY")
                        : "N/A"
                    }
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-500">
                    Assigned To
                  </label>
                  <AvatarGroup
                    avatars={task?.assignedTo?.map(
                      (item) => item?.profileImageUrl,
                    )}
                    maxVisible={5}
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="text-xs font-medium text-slate-500">
                  Todo Checklist
                </label>
                {task?.todoChecklist?.map((item, index) => (
                  <TodoChecklist
                    key={`todo ${index}`}
                    text={item.text}
                    isChecked={item?.completed}
                    onChange={() => updateTodoChecklist(index)}
                  />
                ))}
              </div>
              {task?.attachments?.length > 0 && (
                <div className="mt-2">
                  <label className="text-xs font-medium text-slate-500">
                    Attachments
                  </label>
                  {task?.attachments?.map((link, index) => (
                    <Attachment
                      key={`link_${index}`}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

const InfoBox = ({ label, value }) => {
  return (
    <>
      <label className="text-xs font-medium text-slate-500">{label}</label>
      <p className="mt-0.5 text-[12px] font-medium text-gray-700 md:text-[13px]">
        {value}
      </p>
    </>
  )
}

const TodoChecklist = ({ text, isChecked, onChange }) => {
  return (
    <div className="flex items-center gap-3 p-3">
      <input
        type="checkbox"
        className="text-primary h-4 w-4 cursor-pointer rounded-sm border-gray-300 bg-gray-100 outline-none"
        checked={isChecked}
        onChange={onChange}
      />
      <p className="text-[13px] text-gray-800">{text}</p>
    </div>
  )
}

const Attachment = ({ link, index, onClick }) => {
  return (
    <div
      className="mt-2 mb-3 flex cursor-pointer justify-between rounded-md border border-gray-100 bg-gray-50 px-3 py-2"
      onClick={onClick}
    >
      <div className="flex flex-1 items-center gap-3">
        <span className="mr-2 text-xs font-semibold text-gray-400">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>
        <p className="text-xs text-black">{link}</p>
      </div>
      <LuSquareArrowUpRight className="text-gray-400" />
    </div>
  )
}

export default ViewTaskDetails
