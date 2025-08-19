const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="">
      <p className="text-xs">{content}</p>
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-rose-100 bg-rose-50 px-4 py-2 text-xs font-medium whitespace-nowrap text-rose-500 md:text-sm"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert
