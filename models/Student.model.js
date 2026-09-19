const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  linkedinUrl: { type: String, default: "" },
  languages: { 
    type: [String], 
    enum: ["English", "Spanish", "French", "German", "Dutch", "Portuguese"] 
  },
  program: { 
    type: String, 
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"] 
  },
  background: { type: String, default: "" },
  image: { type: String, default: "" },
 
  cohort: { type: Schema.Types.ObjectId, ref: "Cohort" },
  projects: { type: Array }
});


const Student = mongoose.model("Student", studentSchema);
module.exports = Student;