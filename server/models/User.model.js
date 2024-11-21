const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required "],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required "],
    unique: true,
  },
});

const User = model("User", userSchema);

module.exports = User;
