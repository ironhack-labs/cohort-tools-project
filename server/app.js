const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();



const jwt = require('jsonwebtoken')
// MongoDB Setup
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


// Créer les modèles
const Cohort = require('./models/Cohort');
const Student = require('./models/Student');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Mount routes
//
app.use("/api", require("./routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/api", require("./routes/cohort.routes"));
app.use("/api", require("./routes/student.routes"));

app.use("/api", require("./routes/user.routes"));




// Routes
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});



// Import the custom error handling middleware:
const { errorHandler, notFoundHandler } = require('./middleware/error-handling');

// Set up custom error handling middleware:
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});