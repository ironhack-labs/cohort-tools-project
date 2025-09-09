const mongoose = require("mongoose");

//connect to database using mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then((x) => console.log(`connected to database: ${x.connections[0].name}`))
  .catch((err) => console.error(err));