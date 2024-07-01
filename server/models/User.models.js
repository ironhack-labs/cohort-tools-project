const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
