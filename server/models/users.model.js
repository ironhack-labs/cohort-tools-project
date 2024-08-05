const { Schema, model } = require("mongoose");

// Define el esquema para la Cohorte
const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
});

module.exports = model("User", userSchema);
