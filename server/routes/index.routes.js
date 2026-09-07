const express = require("express")
const router = express.Router()

const { verifyToken } = require("../middlewares/auth.middlewares.js")

const cohortsRouter = require("./cohorts.routes")
router.use("/cohorts", cohortsRouter)

const studentsRouter = require("./students.routes")
router.use("/students", studentsRouter)

const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter)

const usersRouter = require("./users.routes.js")
router.use("/users", usersRouter)

module.exports = router