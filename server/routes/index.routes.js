const router = require("express").Router();
const User = require("../models/User.model");

router.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

router.use("/api/cohorts", require("./cohorts.routes"));

router.use("/api/students", require("./students.routes"));

router.use("/api/auth", require("./auth.routes"));

module.exports = router;
