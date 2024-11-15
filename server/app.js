const express = require("express");
const morgan = require("morgan");
////require("dotenv/config");
//require("param.env");



const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");

const { errorHandler, notFoundHandler } = require("./middleware/error-handling.js")




// INITIALIZE EXPRESS APP 
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

// INITIALIZE MONGOOSE
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




// ROUTES 
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.use("/", require("./routes/cohort.routes"));
app.use("/", require("./routes/student.routes"));
//app.use("/", require("./routes/user.routes"));

//ROUTE FOR AUTH
app.use("/auth", require("./routes/auth.routes"));

// ERROR HANDLING 
app.use(errorHandler);
app.use(notFoundHandler);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
