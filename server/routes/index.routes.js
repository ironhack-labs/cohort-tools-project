const { Router } = require("express");
const router = Router();

router.get("/test/:userId", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  res.status(200).json({ message: "accessing the /test route" });
});

const studentsRouter = require("./students.routes");
router.use( "/students", studentsRouter);

const cohortsRouter = require("./cohorts.routes");
router.use("/cohorts", cohortsRouter);

module.exports = router;
