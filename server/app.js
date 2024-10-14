const express = require("express");

const PORT = process.env.PORT ||5005;
require("dotenv").config()
require("./db");
// STATIC DATA

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const configs = require("./config");
configs(app);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html

const indexRouter = require("./routes/index.routes");
app.use("/api", indexRouter);

//GESTOR DE ERRORES

const errorHandling = require("./error-handlers");
errorHandling(app);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
