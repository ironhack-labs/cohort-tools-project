const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.']
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    name:{
      type: String, required:true
    }
  }
);

const User = model("User", userSchema);

module.exports = User;