const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const x = await mongoose.connect("mongodb://127.0.0.1:27017/cohort-tools-api");
    console.log(`Connected to Database: "${x.connections[0].name}"`);
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
};

module.exports = connectDB;