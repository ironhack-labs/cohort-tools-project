const mongoose = require("mongoose");

//Middleware
const MONGODB_URI = "mongodb://127.0.0.1:27017/cohort-tools-project";

const withDB = async (serverListener) => {
  try {
    const x = await mongoose.connect(MONGODB_URI);
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    if (typeof serverListener === "function") {
      serverListener();
    }
  } catch (error) {
    console.error("Error connecting to mongo: ", err);
  }
};

module.exports = withDB;
