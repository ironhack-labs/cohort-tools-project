const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: {
    type: String, 
    enum: ["English", "French", "Spanish", "Dutch", "Portuguese", "German"]
  },
  program: String,
  background: String,
  image: String,
  projects: [],
  cohort: {
      // <== UPDATE
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cohorts' 
  
  }
});

const Students = mongoose.model("Students", schema);
module.exports = Students;
