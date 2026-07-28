import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/index.js";
import cohortRoutes from "./routes/cohort.routes.js";
import studentRoutes from "./routes/student.routes.js";
import userRoutes from "./routes/user.routes.js";

const PORT = process.env.PORT || 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
connectDB();


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
///


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(userRoutes);


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.use("/api/cohorts", cohortRoutes);
app.use("/api/students", studentRoutes);
app.get("/docs", (req, res) => {
  res.sendFile(import.meta.dirname + "/views/docs.html");
});




// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//INITIALIZE MONGOOSE 


connectDB();
