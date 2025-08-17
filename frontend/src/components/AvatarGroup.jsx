const AvatarGroup = ({ avatars, maxVisible = 3 }) => {
  return (
    <div className="flex items-center">
      {avatars.slice(0, maxVisible).map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar ${index}`}
          className="-ml-3 h-9 w-9 rounded-full border-2 border-white first:ml-0"
        />
      ))}
      {avatars.length > maxVisible && (
        <div className="-ml-3 flex h-9 w-9 justify-center rounded-full border-2 border-white bg-blue-50 text-sm font-medium">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  )
}

export default AvatarGroup
