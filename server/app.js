require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.model");

const PORT = 5005;

const app = express();

const cohorts = require("./cohorts.json");
const students = require("./students.json");

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://localhost:27017/cohortToolsDB")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("error connecting to MongoDB", err);
  });

const cohortSchema = new mongoose.Schema({
  cohortSlug: { type: String, required: true, unique: true },
  cohortName: { type: String, required: true },
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  format: { type: String, enum: ["Full Time", "Part Time"] },
  campus: {
    type: String,
    enum: [
      "Madrid",
      "Barcelona",
      "Miami",
      "Paris",
      "Berlin",
      "Amsterdam",
      "Lisbon",
      "Remote",
    ],
  },
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  inProgress: { type: Boolean, default: false },
  programManager: { type: String, required: true },
  leadTeacher: { type: String, required: true },
  totalHours: { type: Number, default: 360 },
});

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  linkedinUrl: { type: String, default: "" },
  languages: [
    {
      type: String,
      enum: [
        "English",
        "Spanish",
        "French",
        "German",
        "Portuguese",
        "Dutch",
        "Other",
      ],
    },
  ],
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  background: { type: String, default: "" },
  image: { type: String, default: "https://i.imgur.com/r8bo8u7.png" },
  cohort: { type: mongoose.Schema.Types.ObjectId, ref: "Cohort" },
  projects: [String],
});

const Cohort = mongoose.model("Cohort", cohortSchema);
const Student = mongoose.model("Student", studentSchema);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
// ...
app.get("/", (req, res) => {
  res.send("Hello Olumide");
});

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/// Create a new student
app.post("/api/students", (req, res) => {
  Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    cohort: req.body.cohort,
    projects: req.body.projects,
  })
    .then((createdStudent) => {
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while creating a new student" });
    });
});

// Retrieve all students
app.get("/api/students", (req, res) => {
  Student.find()
    .populate("cohort")
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while getting all students" });
    });
});

// Retrieve all students for a given cohort
app.get("/api/students/cohort/:cohortId", (req, res) => {
  Student.find({ cohort: req.params.cohortId })
    .populate("cohort")
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error while getting students for the given cohort" });
    });
});

// Retrieve a specific student by id
app.get("/api/students/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error while getting a specific student" });
    });
});

// Update a specific student by id
app.put("/api/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .populate("cohort")
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error while updating a specific student" });
    });
});

// Delete a specific student by id
app.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .populate("cohort")
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error while deleting a specific student" });
    });
});

// Create a new cohort
app.post("/api/cohorts", (req, res) => {
  Cohort.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    inProgress: req.body.inProgress,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  })
    .then((createdCohort) => {
      res.status(201).json(createdCohort);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error while creating a new cohort" });
    });
});

// Retrieve all cohorts
app.get("/api/cohorts", (req, res) => {
  Cohort.find()
    .then((cohorts) => {
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while getting all cohorts" });
    });
});

// Retrieve a specific cohort by id
app.get("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error while getting a specific cohort" });
    });
});

// Update a specific cohort by id
app.put("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error while updating a specific cohort" });
    });
});

// Delete a specific cohort by id
app.delete("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error while deleting a specific cohort" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
