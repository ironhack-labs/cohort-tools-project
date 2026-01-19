const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  }
  //   { timestamps: true } // Important but not in the project
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
