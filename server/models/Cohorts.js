const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const Model = mongoose.model;


const cohortsSchema = new Schema({
    inProgress: Boolean,
    cohortSlug: String,
    cohortName: String,
    program: String,
    campus: String,
    startDate: String,
    endDate: String,
    programManager: String,
    leadTeacher: String,
    totalHours: Number
  })

  //create a model
const Cohort = Model("Cohort", cohortsSchema)

module.exports = Cohort