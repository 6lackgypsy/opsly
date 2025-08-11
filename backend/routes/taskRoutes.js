const express = require("express")
const { protect, adminOnly } = require("../middleware/authMiddleware")
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getDashboardData,
  getUserDashboardData,
  updateTaskStatus,
  updateTaskChecklist
} = require("../controllers/taskController")

const router = express.Router()

router.get("/", protect, getTasks)
router.post("/", protect, adminOnly, createTask)
router.get("/dashboard-data", protect, getDashboardData)
router.get("/user-dashboard-data", protect, getUserDashboardData)
router.get("/:id", protect, getTask)
router.put("/:id", protect, updateTask)
router.delete("/:id", protect, adminOnly, deleteTask)
router.put("/:id/status", protect, updateTaskStatus)
router.put("/:id/todo", protect, updateTaskChecklist)

module.exports = router
