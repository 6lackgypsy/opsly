const CustomLegend = ({ payload }) => {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2 space-x-6">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            style={{ backgroundColor: entry.color }}
            className="h-2.5 w-2.5 rounded-full"
          ></div>
          <span className="text-xs font-medium text-gray-700">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default CustomLegend
