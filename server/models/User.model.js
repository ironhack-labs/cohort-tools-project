const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required."]
    },
    name: {
      type: String,
      required: [true, "Name is required."]
    }
  },
  {
    timestamps: true
  }
);

// CREATE MODEL
const User = mongoose.model("User", userSchema);

// EXPORT
module.exports = User;
