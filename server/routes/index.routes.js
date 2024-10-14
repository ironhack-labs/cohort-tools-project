const express = require("express")
const router = express.Router()

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const userRouter = require("./users.routes")
router.use("/users", userRouter)

const studentsRouter = require("./students.routes")
router.use("/students", studentsRouter)

const cohortsRouter = require("./cohorts.routes")
router.use("/cohorts", cohortsRouter)



module.exports = router
