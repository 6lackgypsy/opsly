const InfoCard = ({ label, value, color }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`h-3 w-2 rounded-full md:h-5 md:w-2 ${color} `}></div>
      <p className="text-sm text-gray-500 md:text-[14px]">
        <span className="text-sm font-semibold text-black md:text-[15px]">
          {value}
        </span>{" "}
        {label}
      </p>
    </div>
  )
}

export default InfoCard
