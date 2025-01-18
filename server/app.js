const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const PORT = process.env.PORT || 5005;

// Check for required environment variables
if (!process.env.JWT_SECRET) {
  console.error("Error: JWT_SECRET is not defined in .env");
  process.exit(1);
}

// Models
const Cohort = require("./models/Cohort");
const Student = require("./models/Student");
const User = require("./models/User"); // Add the User model

// Import routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const cohortRoutes = require("./routes/cohortRoutes");
const studentRoutes = require("./routes/studentRoutes");

// Initialize Express App
const app = express();

// Middleware
const corsOptions = {
  origin: "*", // Allow all origins (update for production)
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public")); // Serve static files

const MONGO_URI =
  "mongodb+srv://joshua:znMH6MIKIDwZOLMx@cluster0.8l6cx.mongodb.net/cohortTools?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit the process on a critical connection error
  });

// Routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/api/users", userRoutes); // User routes
app.use("/api/cohorts", cohortRoutes); // Cohort routes
app.use("/api/students", studentRoutes); // Student routes

// Handle storing user credentials in database
app.post("/auth/signup", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Handle user login and token generation
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Verify JWT token
app.get("/auth/verify", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Token is valid", user: decoded });
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack
  res.status(500).json({ error: "Internal Server Error" }); // Generic error response
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
