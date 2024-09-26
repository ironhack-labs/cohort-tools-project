const router = require("express").Router();
const studentRoutes = require("./student.routes");
const cohortRoutes = require("./cohort.routes");

// Starting with /api
router.get("/", (req, res) => {
  res.json("All good in here");
});

//students routes
router.use("/students", studentRoutes);

//cohorts routes
router.use("/cohorts", cohortRoutes);

module.exports = router;
