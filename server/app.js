try {
  process.loadEnvFile()
} catch (error) {
  console.log("no .env found, using default variables if any")
}

const express = require("express");
const app = express();
const helmet = require("helmet")
const applyConfigs = require("./config/index.js")
applyConfigs(app)
const rateLimit = require("express-rate-limit")
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 30
})


app.use(limiter)
app.use(helmet())

require("./db/index.js")  // automatically looks for a file called index inside the folder.


app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// all the other routes
const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

// Import the custom error handling middleware:
const { errorHandler, notFoundHandler } = require('./middlewares/error.handling');

// Set up custom error handling middleware:
app.use(notFoundHandler);
app.use(errorHandler);

// server listen & PORT
const PORT = process.env.PORT || 5006

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
