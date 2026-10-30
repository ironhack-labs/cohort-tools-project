const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
  name: { type: String, required: true },
  program: { type: String, required: true },
  format: { type: String, required: true },
  campus: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true }
});

const Cohort = mongoose.model("Cohort", cohortSchema);
module.exports = Cohort;
