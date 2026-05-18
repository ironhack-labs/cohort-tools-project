const express = require("express");
const router = express.Router();

router.get("/test", (req, res, next) => {
  console.log(req.body);
  console.log(req.query);
  console.log(req.params);

  res.status(200).json({ message: "all good here!" });
});

const studentRoutes = require("./student.routes.js");
router.use("/students", studentRoutes);

const cohortRoutes = require("./cohort.routes.js");
router.use("/cohorts", cohortRoutes);

const authRoutes = require("./auth.routes.js");
router.use("/auth", authRoutes);

const privateRoutes = require("./private-routes.routes.js");
router.use("/private-routes", privateRoutes);

module.exports = router;
