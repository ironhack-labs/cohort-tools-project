try {
  process.loadEnvFile();
} catch (erros) {
  console.log(".env file not found");
}

const express = require("express");
const app = express();
const port = process.env.PORT || 5005;

// connection to the database

require("./db")

//configurations
const config = require("./config")
config(app)


app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


///students API
// cohorts API
const indexRouter = require("./routes/index.routes")
app.use("/api", indexRouter)

//error
//400 errors
// 500 errors

const errorsHandling = require("./errors")
errorsHandling(app)

// START SERVER
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});