const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  email: { type: String, required: [true, "email required"], unique: true },
  password: { type: String, required: [true, "password required"] },
  name: { type: String, required: [true, "name required"] }
});

module.exports = mongoose.model("User", usersSchema);