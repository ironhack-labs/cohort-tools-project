const express = require("express");

const router= express.Router()


const studentRoute = require("./student.routes")
router.use("/students", studentRoute)

const cohortRoute =  require("./cohort.routes")
router.use("/cohorts", cohortRoute)

const authRoute = require("./auth.routes")
router.use("/auth", authRoute)

module.exports = router