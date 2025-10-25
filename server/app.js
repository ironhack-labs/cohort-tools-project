// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5005;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cohort-tools-api";

// MODELS
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");
const User = require("./models/User.model");

// MIDDLEWARE
const isAuthenticated = require("./middleware/jwt.middleware");

// ROUTES
const authRoutes = require("./routes/auth.routes");


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// DATABASE CONNECTION
// https://mongoosejs.com/docs/connections.html
mongoose
  .connect(MONGODB_URI)
  .then((connection) => {
    const dbName = connection.connections[0].name;
    console.log(`Connected to MongoDB database: ${dbName}`);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(cors({
  origin: ["http://localhost:5173"]
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:

// Documentation route (public)
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// Authentication routes (public)
app.use("/auth", authRoutes);

// Protected routes - require authentication
// Cohort routes
app.get("/api/cohorts", isAuthenticated, async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    console.error("Error fetching cohorts:", error);
    res.status(500).json({ message: "Error fetching cohorts" });
  }
});

app.get("/api/cohorts/:cohortId", isAuthenticated, async (req, res) => {
  try {
    const { cohortId } = req.params;
    const cohort = await Cohort.findById(cohortId);

    if (cohort) {
      res.json(cohort);
    } else {
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {
    console.error("Error fetching cohort:", error);
    res.status(500).json({ message: "Error fetching cohort" });
  }
});

app.post("/api/cohorts", isAuthenticated, async (req, res) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (error) {
    console.error("Error creating cohort:", error);
    res.status(500).json({ message: "Error creating cohort" });
  }
});

app.put("/api/cohorts/:cohortId", isAuthenticated, async (req, res) => {
  try {
    const { cohortId } = req.params;
    const updatedCohort = await Cohort.findByIdAndUpdate(cohortId, req.body, { new: true });

    if (updatedCohort) {
      res.json(updatedCohort);
    } else {
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {
    console.error("Error updating cohort:", error);
    res.status(500).json({ message: "Error updating cohort" });
  }
});

app.delete("/api/cohorts/:cohortId", isAuthenticated, async (req, res) => {
  try {
    const { cohortId } = req.params;
    const deletedCohort = await Cohort.findByIdAndDelete(cohortId);

    if (deletedCohort) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {
    console.error("Error deleting cohort:", error);
    res.status(500).json({ message: "Error deleting cohort" });
  }
});

// Student routes
app.get("/api/students", isAuthenticated, async (req, res) => {
  try {
    const students = await Student.find().populate("cohort");
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
});

app.get("/api/students/cohort/:cohortId", isAuthenticated, async (req, res) => {
  try {
    const { cohortId } = req.params;
    const students = await Student.find({ cohort: cohortId }).populate("cohort");
    res.json(students);
  } catch (error) {
    console.error("Error fetching students by cohort:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
});

app.get("/api/students/:studentId", isAuthenticated, async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate("cohort");

    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Error fetching student" });
  }
});

app.post("/api/students", isAuthenticated, async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Error creating student" });
  }
});

app.put("/api/students/:studentId", isAuthenticated, async (req, res) => {
  try {
    const { studentId } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, { new: true }).populate("cohort");

    if (updatedStudent) {
      res.json(updatedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Error updating student" });
  }
});

app.delete("/api/students/:studentId", isAuthenticated, async (req, res) => {
  try {
    const { studentId } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (deletedStudent) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Error deleting student" });
  }
});

// User routes
app.get("/api/users/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID (excluding password)
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data
    res.json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});