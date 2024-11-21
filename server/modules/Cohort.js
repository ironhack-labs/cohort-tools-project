const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
  inProgress: { 
    type: Boolean, 
    default: true 
  },
  cohortSlug: { 
    type: String, 
    required: true 
  },
  cohortName: { 
    type: String, 
    required: true 
  },
  program: { 
    type: String, 
    required: true 
  },
  campus: { 
    type: String 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date 
  },
  programManager: { 
    type: String 
  },
  leadTeacher: { 
    type: String 
  },
  totalHours: { 
    type: Number, 
    min: 0 
  }
});


const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;