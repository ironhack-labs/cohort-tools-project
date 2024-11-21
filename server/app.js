const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cohortRoutes = require("./routes/cohorts.routes");
const studentRoutes = require("./routes/students.routes");
const userRoutes = require("./routes/user.routes"); // User routes
const authRoutes= require("./routes/auth.routes")
const app = express();

dotenv.config(); // Load environment variables

app.use(cors());
app.use(express.json()); // Parse JSON data

connectDB(); // Connect to the database

// Routes
app.use("/api/cohorts", cohortRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes); // Use user routes
app.use("/auth", authRoutes)
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
