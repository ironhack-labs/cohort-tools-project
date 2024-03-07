const express = require("express");
const router = express.Router()


// GET "/api" => all routes here...

// router.get("/", (req, res, next) => {
//     res.status(200).json({message: "todo bien"})
//   })


  // COHORT ROUTES

  
  const cohortRouter = require("./cohort.routes")
  router.use("/cohorts", cohortRouter)

  // STUDENT ROUTES

  const studentRouter = require("./student.routes")
  router.use("/students", studentRouter)


  
  


  module.exports = router