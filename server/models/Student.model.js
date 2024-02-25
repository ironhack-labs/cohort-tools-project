const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: {
    type: String,
    enum: [
      "English",
      "Spanish",
      "French",
      "German",
      "Portuguese",
      "Dutch",
      "Other",
    ],
  },
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  background: String,
  image: String,
  cohort: { type: Schema.Types.ObjectId, ref: "Cohort" },
  projects: Array,
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
