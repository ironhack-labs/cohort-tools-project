const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = model("User", userSchema);
