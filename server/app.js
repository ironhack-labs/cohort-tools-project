const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 5005;
const mongoose = require("mongoose");
const Cohort = require("./models/Cohort.model.js");
const Student = require("./models/Student.model.js");
const authRoutes = require("./routes/auth.routes.js"); 
const userRoutes = require("./routes/user.routes.js");


// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/students", (req, res, next) => {
  Student.find()
    .populate("cohort")
    .then((allStudents) => {
      res.json(allStudents);
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/api/students/cohort/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((studentsFromCohort) => {
      res.json(studentsFromCohort);
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/api/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;

  Student.findById(studentId)
    .populate("cohort")
    .then((foundStudent) => {
      if (!foundStudent) {
        const error = new Error("Student not found");
        error.status = 404;
        return next(error);
      }

      res.json(foundStudent);
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/students", (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects
  } = req.body;

  Student.create({
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects
  })
    .then((newStudent) => {
      res.status(201).json(newStudent);
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;

  Student.findByIdAndUpdate(studentId, req.body, {
    new: true,
    runValidators: true
  })
    .populate("cohort")
    .then((updatedStudent) => {
      if (!updatedStudent) {
        const error = new Error("Student not found");
        error.status = 404;
        return next(error);
      }

      res.json(updatedStudent);
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/students/:studentId", (req, res, next) => {
  const { studentId } = req.params;

  Student.findByIdAndDelete(studentId)
    .then((deletedStudent) => {
      if (!deletedStudent) {
        const error = new Error("Student not found");
        error.status = 404;
        return next(error);
      }

      res.json({ message: "Student deleted successfully" });
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/api/cohorts", (req, res, next) => {
  Cohort.find()
    .then((allCohorts) => {
      res.json(allCohorts);
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/api/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  Cohort.findById(cohortId)
    .then((foundCohort) => {
      if (!foundCohort) {
        const error = new Error("Cohort not found");
        error.status = 404;
        return next(error);
      }

      res.json(foundCohort);
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/cohorts", (req, res, next) => {
  const {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours
  } = req.body;

  Cohort.create({
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours
  })
    .then((newCohort) => {
      res.status(201).json(newCohort);
    })
    .catch((error) => {
      next(error);
    });
});


app.use("/auth", authRoutes);
app.use("/api", userRoutes);

app.put("/api/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  Cohort.findByIdAndUpdate(cohortId, req.body, {
    new: true,
    runValidators: true
  })
    .then((updatedCohort) => {
      if (!updatedCohort) {
        const error = new Error("Cohort not found");
        error.status = 404;
        return next(error);
      }

      res.json(updatedCohort);
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/cohorts/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;

  Cohort.findByIdAndDelete(cohortId)
    .then((deletedCohort) => {
      if (!deletedCohort) {
        const error = new Error("Cohort not found");
        error.status = 404;
        return next(error);
      }

      res.json({ message: "Cohort deleted successfully" });
    })
    .catch((error) => {
      next(error);
    });
});

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.error("ERROR", error);

  if (res.headersSent) {
    return next(error);
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      errors: error.errors
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format"
    });
  }

  if (error.code === 11000) {
    return res.status(400).json({
      message: "Duplicate value error",
      error: error.keyValue,
    });
  }

  if (error.name === "UnauthorizedError") {
  return res.status(401).json({
    message: "Invalid or missing token",
  });
}

  res.status(error.status || 500).json({
    message: error.message || "Internal Server Error"
  });
});




// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});