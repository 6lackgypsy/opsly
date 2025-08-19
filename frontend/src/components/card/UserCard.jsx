const UserCard = ({ userInfo }) => {
  return (
    <div className="user-card p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userInfo?.profileImageUrl}
            alt="Avatar"
            className="h-12 w-12 rounded-full border-2 border-white"
          />
          <div>
            <p className="text-sm font-medium">{userInfo?.name}</p>
            <p className="text-sm text-gray-500">{userInfo?.email}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-end gap-3">
        <StatCard
          label="Pending"
          status="Pending"
          count={userInfo?.pendingTasks || 0}
        />
        <StatCard
          label="In Progress"
          status="In Progress"
          count={userInfo?.inProgressTasks || 0}
        />
        <StatCard
          label="Completed"
          status="Completed"
          count={userInfo?.completedTasks || 0}
        />
      </div>
    </div>
  )
}

const StatCard = ({ label, status, count }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "Completed":
        return "bg-gray-50 text-indigo-500"
      case "In Progress":
        return "bg-gray-50 text-cyan-500"
      default:
        return "bg-gray-50 text-violet-500"
    }
  }

  return (
    <div
      className={`flex-1 rounded px-4 py-0.5 text-[10px] font-medium ${getStatusTagColor()}`}
    >
      <span className="text-[12px] font-semibold">{count} </span>
      <br />
      {label}
    </div>
  )
}

export default UserCard
