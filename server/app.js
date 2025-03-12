require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const Student = require("./models/Students.model");
const Cohort = require("./models/Cohorts.model");
const User = require("./models/User.model");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
const { isAuthenticated } = require("./middlewares");
// MIDDLEWARE
// require("./config")(app);
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);



mongoose
  .connect(process.env.MONGO_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// app.get("/api/students", (req, res) => {
//   res.sendFile(__dirname + "/students.json");
// });

// app.get("/api/cohorts", (req, res) => {
//   res.sendFile(__dirname + "/cohorts.json");
// });

// students
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.json(newStudent);
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const students = await Student.find({ cohortId: req.params.cohortId });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/students/:studentId", async (req, res) => {
  try {
    // user {} or null
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    } else {
      res.json(student);
    }
  } catch (error) {
    console.error(error);
  }
});

app.put("/api/students/:studentId/cohorts/:cohortId", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      { $push: { cohortsId: req.params.cohortId } },
      {
        new: true,
      }
    );
    res.json(student);
  } catch (error) {
    console.error(error);
  }
});

app.put("/api/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      {
        new: true,
      }
    );
    res.json(student);
  } catch (error) {
    console.error(error);
  }
});

app.delete("/api/students/:studentId", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.studentId);
    res.json(student);
  } catch (error) {
    console.error(error);
  }
});

//cohorts
app.post("/api/cohorts", async (req, res) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId); // user {} or null

    if (!cohort) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.json(cohort);
    }
  } catch (error) {
    console.error(error);
  }
});
app.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      {
        new: true,
      }
    );
    res.json(cohort);
  } catch (error) {
    console.error(error);
  }
});
app.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findByIdAndDelete(req.params.cohortId);
    res.json(cohort);
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/users/:id", isAuthenticated, async (req, res) => {
  try {
    // user {} or null
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
