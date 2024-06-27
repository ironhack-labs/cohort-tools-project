const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true, trim: true, maxLength: 60 },
  password: { type: String,  required: true },
  username: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
