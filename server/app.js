const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PORT = 5005;

// INITIALIZE EXPRESS APP
const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173'
}));

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cohort-tools-api', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.error('MongoDB connection error:', err));

// SCHEMAS

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

userSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, (err, match) => {
    if (err) {
      return callback(err);
    }
    callback(null, match);
  });
};

const User = mongoose.model('User', userSchema);

// AUTHENTICATION ROUTES
app.post('/api/users/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Login failed' });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: 'Login failed' });
      }
      const token = jwt.sign({ userId: user._id }, '2d61dda4dbdc11bba09a6ce778f2b488aa860b6bbefda4e0e8c5fca3b21fc0f358e14f07df207d1e9120a6b4c3ebcaf51b958a2b94aabd8b5cd76b933c6b5f2c', { expiresIn: '1h' });
      res.json({ token });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// AUTHENTICATE MIDDLEWARE
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  jwt.verify(token, '2d61dda4dbdc11bba09a6ce778f2b488aa860b6bbefda4e0e8c5fca3b21fc0f358e14f07df207d1e9120a6b4c3ebcaf51b958a2b94aabd8b5cd76b933c6b5f2c', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};





const cohortSchema = new mongoose.Schema({
  cohortSlug: { type: String, required: true, unique: true },
  cohortName: { type: String, required: true },
  program: { type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"], required: true },
  format: { type: String, enum: ["Full Time", "Part Time"], required: true },
  campus: { type: String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"], required: true },
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  inProgress: { type: Boolean, default: false },
  programManager: { type: String, required: true },
  leadTeacher: { type: String, required: true },
  totalHours: { type: Number, default: 360 }
});

const Cohort = mongoose.model('Cohort', cohortSchema);

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  linkedinUrl: { type: String, default: "" },
  languages: { type: [String], enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"] },
  program: { type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"], required: true },
  background: { type: String, default: "" },
  image: { type: String, default: "https://i.imgur.com/r8bo8u7.png" },
  cohort: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort' },
  projects: [{ type: String }]
});

const Student = mongoose.model('Student', studentSchema);

// Custom Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Handling 400 Bad Request
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        message: "Validation Error: " + err.message // Customize the message as needed
      }
    });
  }

  // Handling 404 Not Found
  if (err.status === 404) {
    return res.status(404).json({
      error: {
        message: err.message || "Resource not found" // Customize the message as needed
      }
    });
  }

  // Handling other errors
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message || "An unexpected error occurred." // Default error message
    }
  });
};


// COHORT ROUTES
app.post("/api/cohorts", async (req, res, next) => {
  try {
    const newCohort = new Cohort(req.body);
    const savedCohort = await newCohort.save();
    res.status(201).json(savedCohort);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

app.get("/api/cohorts", async (req, res, next) => {
  try {
    const allCohorts = await Cohort.find();
    res.json(allCohorts);
  } catch (error) {
    next(error);
  }
});

app.get("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort) {
      throw new Error("Cohort not found");
    }
    res.json(cohort);
  } catch (error) {
    error.status = 404;
    next(error);
  }
});

app.put("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true });
    if (!updatedCohort) {
      throw new Error("Cohort not found");
    }
    res.json(updatedCohort);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

app.delete("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const deletedCohort = await Cohort.findByIdAndDelete(req.params.cohortId);
    if (!deletedCohort) {
      throw new Error("Cohort not found");
    }
    res.json({ message: "Cohort deleted successfully" });
  } catch (error) {
    error.status = 404;
    next(error);
  }
});

// STUDENT ROUTES
app.post("/api/students", async (req, res, next) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

app.get("/api/students", async (req, res, next) => {
  try {
    const allStudents = await Student.find().populate("cohort");
    res.json(allStudents);
  } catch (error) {
    next(error);
  }
});

app.get("/api/students/cohort/:cohortId", async (req, res, next) => {
  try {
    const students = await Student.find({ cohort: req.params.cohortId }).populate("cohort");
    res.json(students);
  } catch (error) {
    next(error);
  }
});

app.get("/api/students/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.studentId).populate("cohort");
    if (!student) {
      throw new Error("Student not found");
    }
    res.json(student);
  } catch (error) {
    error.status = 404;
    next(error);
  }
});

app.put("/api/students/:studentId", async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true });
    if (!updatedStudent) {
      throw new Error("Student not found");
    }
    res.json(updatedStudent);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

app.delete("/api/students/:studentId", async (req, res, next) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.studentId);
    if (!deletedStudent) {
      throw new Error("Student not found");
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    error.status = 404;
    next(error);
  }
});


app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: "This is a protected route" });
});

// Use the custom error handling middleware
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
