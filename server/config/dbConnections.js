const mongoose = require("mongoose");

const URI =
  process.env.MONGODB_URI || "mongodb://localhost/cohort-tools-project";

mongoose
  .connect(URI)
  .then((db) => console.log(`Connected to ${db.connection.name}`))
  .catch(console.log);
// mongoose.connect('mongodb://127.0.0.1/')
