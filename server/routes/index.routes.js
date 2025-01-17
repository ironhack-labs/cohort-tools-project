const router = require("express").Router();

// All the routes in there starts with "/api", see app.js to see how the router is imported and used

// router.get("/", (req, res) => {
//   console.log("Hello from the server");
// });

const cohortsRoutes = require("./cohorts.routes");
router.use("/cohorts", cohortsRoutes);

const studentsRoutes = require("./students.routes");
router.use("/students", studentsRoutes);

const usersRoutes = require("./user.routes");
router.use("/users", usersRoutes);

module.exports = router;
