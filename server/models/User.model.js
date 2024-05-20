const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});

module.exports = model("User", userSchema);
