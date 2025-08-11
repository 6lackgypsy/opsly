const express = require("express")
const { protect, adminOnly } = require("../middleware/authMiddleware")
const { getUsers, getUser } = require("../controllers/userController")

const router = express.Router()

router.get("/", protect, adminOnly, getUsers)
router.get("/:id", protect, getUser)

module.exports = router
