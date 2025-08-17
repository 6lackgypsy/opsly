const Modal = ({ isOpen, onClose, title, children }) => {
  return isOpen ? (
    <div className="bg-opacity-50 fixed top-0 right-0 left-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-black/20">
      <div className="relative max-h-full w-full max-w-2xl p-4">
        <div className="relative rounded-lg bg-white shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5 dark:border-gray-600">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                aria-hidden={true}
                fill="none"
                width="13px"
                height="13px"
                strokeWidth="2.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-4 p-4 md:p-5">{children}</div>
        </div>
      </div>
    </div>
  ) : null
}

export default Modal
