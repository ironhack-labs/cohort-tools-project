const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: [ true, "Username is required" ],
    unique: true,
  },
  email: {
    type: String,
    required: [ true, "Email is required" ],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [ true, "Password is required" ],
  }
});

module.exports = model("User", userSchema);
