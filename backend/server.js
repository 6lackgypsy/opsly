require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const connectDB = require("./config/db")
const morgan = require("morgan")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/taskRoutes")
const reportRoutes = require("./routes/reportRoutes")

const app = express()
const PORT = process.env.PORT || 8000

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/reports", reportRoutes)

app.all("*", (req, res) => {
  res.status(404)

  if (req.accepts("json")) {
    res.json({ message: "404 Not Found" })
  } else {
    res.type("txt").send("404 Not Found")
  }
})

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
