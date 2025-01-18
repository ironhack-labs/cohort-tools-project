const mongoose = require("mongoose");

const CohortSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const Cohort = mongoose.model("Cohort", CohortSchema);
module.exports = Cohort;
