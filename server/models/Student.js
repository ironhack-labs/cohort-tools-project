const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentsSchema = new Schema({
  firstName: { type: String, required: [true, "firstName required"] },
  lastName: { type: String, required: [true, "lastName required"] },
  email: { type: String, required: [true, "email required"], unique: true },
  phone: { type: String, required: [true, "phone number required"] },
  linkedinUrl: { type: String, default: "" },
  languages: {
    type: String,
    enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"],
  },
  program: { type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"] },
  background: { type: String, default: "" },
  image: { type: String, default: "https://i.imgur.com/r8bo8u7.png" },
  projects: [],
  cohort: String,
});

module.exports = mongoose.model("Student", studentsSchema);