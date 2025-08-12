import { useRef, useState } from "react"
import { LuTrash, LuUpload, LuUser } from "react-icons/lu"

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null)

  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setImage(file)

      const preview = URL.createObjectURL(file)

      setPreviewUrl(preview)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreviewUrl(null)
  }

  const onChooseFile = () => {
    inputRef.current.click()
  }

  return (
    <div className="mb-6 flex justify-center">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={handleImageChange}
      />
      {!image ? (
        <div className="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-blue-100/50">
          <LuUser className="text-primary text-4xl" />
          <button
            type="button"
            className="bg-primary absolute -right-1 -bottom-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile photo"
            className="h-20 w-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="absolute -right-1 -bottom-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilePhotoSelector
