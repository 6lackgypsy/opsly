require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")

const app = express()

/* MIDDLEWARE */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)
app.use(express.json())

/* ROUTES */
app.use("/api/auth", authRoutes)
/* app.use("/api/users", userRoutes)
app.use("/api/reports", reportRoutes)
app.use("/api/tasks", taskRoutes) */

/* CONNECT DB */
connectDB()

/* SERVER */
const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
