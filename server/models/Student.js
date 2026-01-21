const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  linkedinUrl: { type: String },
  languages: [{ type: String }],
  program: { type: String, required: true },
  background: { type: String },
  image: { type: String },
  projects: [{ type: String }],
  cohort: { type: Schema.Types.ObjectId, ref: "Cohort", required: true },
});

module.exports = model("Student", studentSchema);
