const moongose = require("mongoose");
const Schema = moongose.Schema;

const studentsSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: [String],
  program: String,
  background: String,
  image: String,
  cohort: Number,
  projects: [String],
  cohortsId: {
    type: moongose.Schema.Types.ObjectId,
    ref: "Cohorts",
  },
});

const Students = moongose.model("Students", studentsSchema);

module.exports = Students;
