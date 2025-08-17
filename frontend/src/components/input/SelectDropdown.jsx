import { useState } from "react"
import { LuChevronDown } from "react-icons/lu"

const SelectDropdown = ({ options, placeholder, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full">
      <button
        className="mt-2 flex w-full cursor-pointer items-center justify-between rounded border border-slate-100 bg-white px-2.5 py-3 text-sm text-black outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value
          ? options.find((opt) => opt.value === value)?.label
          : placeholder}
        <span className="ml-2">
          {isOpen ? (
            <LuChevronDown className="rotate-180" />
          ) : (
            <LuChevronDown />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-slate-100 bg-white shadow-md">
          {options.map((option) => (
            <div
              key={option.value}
              className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SelectDropdown
