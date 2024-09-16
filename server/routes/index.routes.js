const router = require("express").Router();
const Cohort = require("./../models/Cohort.model");
router.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

router.use("/api/cohorts", require("./cohorts.routes"));
router.use("/api/students", require("./students.routes"));
module.exports = router;
