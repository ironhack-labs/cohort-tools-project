const express = require("express")
const router = express.Router()
const cohortRoutes = require("./cohort.routes")
const studentRoutes = require("./student.routes")

router.use("/cohorts", cohortRoutes)
router.use("/students", studentRoutes)

module.exports = router