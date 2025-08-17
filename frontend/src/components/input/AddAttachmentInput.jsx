import { useState } from "react"
import { HiOutlineTrash, HiPlus } from "react-icons/hi"
import { LuPaperclip } from "react-icons/lu"

const AddAttachmentInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("")

  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()])
      setOption("")
    }
  }

  const handleDeleteOption = (index) => {
    const updatedArr = attachments.filter((_, idx) => idx !== index)

    setAttachments(updatedArr)
  }

  return (
    <div>
      {attachments.map((item, index) => (
        <div
          key={item}
          className="mt-2 mb-3 flex justify-between rounded-md border border-gray-100 bg-gray-50 px-3 py-2"
        >
          <div className="flex flex-1 items-center gap-3 border border-gray-100">
            <LuPaperclip className="text-gray-400" />
            <p className="text-xs text-black">{item}</p>
          </div>
          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}
      <div className="mt-4 flex items-center gap-5">
        <div className="flex flex-1 items-center gap-3 rounded-md border border-gray-100 px-3">
          <LuPaperclip className="text-gray-400" />
          <input
            type="text"
            placeholder="Add File Link"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full rounded-md bg-white px-3 py-2 text-[13px] text-black outline-none"
          />
        </div>
        <button className="card-btn text-nowrap" onClick={handleAddOption}>
          <HiPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  )
}

export default AddAttachmentInput
