require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-project")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

const PORT = 5005;

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
  })
);

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.use("/", require("./routes/cohort.routes"))
app.use("/", require("./routes/students.routes"))
app.use("/auth", require("./routes/auth.routes"))
app.use("/", require("./routes/user.routes"))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

