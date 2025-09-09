process.loadEnvFile()

const express = require("express");
const config = require("./config");
const errorHandler = require("./errors");
const indexRouter = require("./routes/index.routes");

const PORT = process.env.PORT || 5005;

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

require("./db");
config(app);
app.use("/api", indexRouter);
errorHandler(app);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
