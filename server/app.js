const express = require ("express")

const app = express();

require ("./db")

const addConfig = require("./config")
addConfig(app)

const PORT = 5005

const indexRouter = require("./routes/index.routes")
app.use("/api", indexRouter)



app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const handleErrors = require("./errors")
handleErrors(app)

// app.get("/api/cohorts", (req, res, next) => {
//   Cohorts.find()
//     .then((data) => {
//       res.json(data);
//     })

//     .catch((error) => {
//       next(error);
//     });
// });

// app.get("/api/students", (req, res, next) => {
//   Students.find()
//   .populate("cohort")
//     .then((data) => {
//       res.json(data);
//     })

//     .catch((error) => {
//       next(error);
//     });
// });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
