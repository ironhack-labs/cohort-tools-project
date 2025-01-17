// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
const withDB = require("./db");

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes

const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

require('./error-handling')(app)

module.exports = app;

// START SERVER
withDB(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
  });
});
// const port = process.env.PORT || 3000
