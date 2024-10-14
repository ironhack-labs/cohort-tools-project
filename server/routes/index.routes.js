const express = require("express");
const router = express.Router();



const cohortRouter = require("./cohort.routes.js");
router.use("/cohorts", cohortRouter);

const studentRouter = require("./student.routes.js");
router.use("/students", studentRouter);

const authRouter= require("./auth.routes.js")
router.use("/auth", authRouter);

const userRouter= require("./user.routes.js")
router.use("/users", userRouter);

module.exports = router;