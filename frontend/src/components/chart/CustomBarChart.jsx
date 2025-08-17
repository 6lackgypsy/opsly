import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const CustomBarChart = ({ data }) => {
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case "Low":
        return "#00bc7d"
      case "Medium":
        return "#fe9900"
      case "High":
        return "#ff1f57"
    }
  }

  const CustomTooltip = ({ active, payload }) => {
    return active && payload && payload.length ? (
      <div className="rounded-lg border border-gray-300 bg-white p-2 shadow-md">
        <p className="mb-1 text-xs font-semibold text-purple-800">
          {payload[0].payload.priority}
        </p>
        <p className="text-sm text-gray-600">
          Count{" "}
          <span className="text-sm font-medium text-gray-900">
            {payload[0].payload.count}
          </span>
        </p>
      </div>
    ) : null
  }

  return (
    <div className="mt-6 bg-white">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="priority"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={CustomTooltip} cursor={{ fill: "transparent" }} />
          <Bar
            dataKey="count"
            nameKey="priority"
            fill="#ff8042"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
