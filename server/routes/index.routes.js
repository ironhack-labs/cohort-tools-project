const express = require("express");
const path = require("path");
const router = express.Router();
const cohortsRouter = require("./cohorts.routes");
const studentsRouter = require("./students.routes");

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
router.get("/docs", (req, res) => {
  const serverFolder = path.normalize(__dirname + "/..");
  res.sendFile(serverFolder + "/views/docs.html");
});

router.use("/cohorts", cohortsRouter);
router.use("/students", studentsRouter);

const authRouter = require ("./auth.routes")
router.use("/auth", authRouter)

const userRouter = require("./user.routes")
router.use("/users", userRouter)

module.exports = router;