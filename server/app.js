try {
  process.loadEnvFile(__dirname + "/.env");
} catch (error) {
  console.warn(".env file not found, using default environment values");
}

const express = require("express");
const User = require("./models/user.models.js");

const app = express();
const config = require("./config");
config(app);

const connectDB = require("./db");
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

const indexRouter = require("./routes/index.routes.js");
app.use("/api", indexRouter);

const errorHandling = require("./errors");
errorHandling(app);

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
