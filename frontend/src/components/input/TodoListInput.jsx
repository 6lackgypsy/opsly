import { useState } from "react"
import { HiOutlineTrash, HiPlus } from "react-icons/hi"

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("")

  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...todoList, option.trim()])
      setOption("")
    }
  }

  const handleDeleteOption = (index) => {
    const updatedArr = todoList.filter((_, idx) => idx !== index)

    setTodoList(updatedArr)
  }

  return (
    <div>
      {todoList.map((item, index) => (
        <div
          key={item}
          className="mt-2 mb-3 flex justify-between rounded-md border border-gray-100 bg-gray-50 px-3 py-2"
        >
          <p className="text-xs text-black">
            <span className="mr-2 text-xs font-semibold text-gray-400">
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>{" "}
            {item}
          </p>
          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}
      <div className="mt-4 flex items-center gap-5">
        <input
          type="text"
          placeholder="Enter Task"
          value={option}
          onChange={({ target }) => setOption(target.value)}
          className="w-full rounded-md border border-gray-100 bg-white px-3 py-2 text-[13px] text-black outline-none"
        />
        <button className="card-btn text-nowrap" onClick={handleAddOption}>
          <HiPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  )
}

export default TodoListInput
