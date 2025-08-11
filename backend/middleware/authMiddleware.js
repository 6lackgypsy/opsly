const jwt = require("jsonwebtoken")
const User = require("../models/User")

/* Middleware to protect routes */
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization || req.headers.Authorization

    if (!token || !token.startsWith("Bearer")) {
      return res.status(401).json({ message: "Not authorized, no token" })
    }

    token = token.split(" ")[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select("-password")

    next()
  } catch (error) {
    res.status(403).json({ message: "Token failed", error: error.message })
  }
}

const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" })
  }

  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied, admin only" })
  }

  next()
}

module.exports = { protect, adminOnly }
