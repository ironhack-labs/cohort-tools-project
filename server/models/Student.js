//{type: Schema.Types.ObjectId, ref: "Cohort"}

const { model, Schema } = require("mongoose");

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: Array,
  program: String,
  background: String,
  image: String,
  projects: Array,
  cohort: { type: Schema.Types.ObjectId, ref: "Cohort" },
});

module.exports = model("Student", studentSchema);
