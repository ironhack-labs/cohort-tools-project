const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  //   username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //   role: {
  //     type: String,
  //     enum: ["admin", "instructor", "student"],
  //     default: "student",
  //   },
});

module.exports = model("User", userSchema);
