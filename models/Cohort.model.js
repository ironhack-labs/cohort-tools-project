const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema({});

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
