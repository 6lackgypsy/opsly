import moment from "moment"
import { useContext, useEffect, useState } from "react"
import { LuArrowRight } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import InfoCard from "../../components/card/InfoCard"
import CustomBarChart from "../../components/chart/CustomBarChart"
import CustomPieChart from "../../components/chart/CustomPieChart"
import Greeting from "../../components/Greeting"
import DashboardLayout from "../../components/layout/DashboardLayout"
import TaskListTable from "../../components/TaskListTable"
import { UserContext } from "../../context/UserContext"
import { useUserAuth } from "../../hooks/useUserAuth"
import { API_PATHS } from "../../utils/apiPaths"
import axiosInstance from "../../utils/axiosInstance"
import { addThousandsSeparator } from "../../utils/helper"

const COLORS = ["#8d51ff", "#00b8db", "#7bce00"]

const Dashboard = () => {
  const navigate = useNavigate()

  useUserAuth()

  const [dashboardData, setDashboardData] = useState(null)
  const [pieChartData, setPieChartData] = useState(null)
  const [barChartData, setBarChartData] = useState(null)
  const [loading, setLoading] = useState(true)

  const { user } = useContext(UserContext)

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA,
      )

      if (response.data) {
        setDashboardData(response.data)
        prepareChartData(response.data?.charts || null)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null
    const taskPriorityLevels = data?.taskPriorityLevels || null
    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ]

    setPieChartData(taskDistributionData)

    const priorityLevelsData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
    ]

    setBarChartData(priorityLevelsData)
  }

  useEffect(() => {
    getDashboardData()

    return () => {}
  }, [])

  const onSeeMore = () => {
    navigate("/admin/tasks")
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      {!dashboardData ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <div className="card my-5">
            <div className="">
              <div className="col-span-3">
                <h2 className="text-xl md:text-2xl">
                  <Greeting /> {user?.name}!
                </h2>
                <p className="mt-1.5 text-xs text-gray-400 md:text-[13px]">
                  {moment().format("dddd Do MMM YYYY")}
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
              <InfoCard
                label={
                  dashboardData?.charts?.taskDistribution?.All === 1
                    ? "Total Task"
                    : "Total Tasks"
                }
                value={addThousandsSeparator(
                  dashboardData?.charts?.taskDistribution?.All || 0,
                )}
                color="bg-primary"
              />
              <InfoCard
                label={
                  dashboardData?.charts?.taskDistribution?.Pending === 1
                    ? "Pending Task"
                    : "Pending Tasks"
                }
                value={addThousandsSeparator(
                  dashboardData?.charts?.taskDistribution?.Pending || 0,
                )}
                color="bg-violet-500"
              />
              <InfoCard
                label={
                  dashboardData?.charts?.taskDistribution?.InProgress === 1
                    ? "In Progress Task"
                    : "In Progress Tasks"
                }
                value={addThousandsSeparator(
                  dashboardData?.charts?.taskDistribution?.InProgress || 0,
                )}
                color="bg-cyan-500"
              />
              <InfoCard
                label={
                  dashboardData?.charts?.taskDistribution?.Completed === 1
                    ? "Completed Task"
                    : "Completed Tasks"
                }
                value={addThousandsSeparator(
                  dashboardData?.charts?.taskDistribution?.Completed || 0,
                )}
                color="bg-lime-500"
              />
            </div>
          </div>
          <div className="my-4 grid grid-cols-1 gap-6 md:my-6 md:grid-cols-2">
            <div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Task Distribution</h5>
                </div>
                <CustomPieChart data={pieChartData} colors={COLORS} />
              </div>
            </div>
            <div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Task Priority Levels</h5>
                </div>
                <CustomBarChart data={barChartData} />
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between">
                  <h5 className="text-lg">Recent Tasks</h5>
                  <button className="card-btn" onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                  </button>
                </div>
                <TaskListTable tableData={dashboardData?.recentTasks || []} />
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  )
}

export default Dashboard
