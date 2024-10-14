const PORT = 5010;

require("dotenv").config();
require("./db")
const express = require("express");
const app = express();

require("./config")(app);
const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

require("./error-handling/index")(app)

/* app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
}); */


//como hemos decidido que todas las rutas al servidor seran /api lo ponemos aqui y lo podemos quitar del archivo de routes



// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
