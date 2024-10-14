const express = require ("express")
const router = express.Router()


const studentRouter = require("./student.routes")
router.use("/students", studentRouter)

const cohortRouter = require("./cohort.routes")
router.use("/cohorts", cohortRouter)

const authRouter=require("./auth.routes")
router.use("/auth", authRouter)

module.exports = router
