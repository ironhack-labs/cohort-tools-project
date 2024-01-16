// ./models/Student.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* const ObjectId = mongoose.Types.ObjectId; // Import ObjectId from mongoose */

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedInUrl: String,
  languages: [String],
  program: String,
  background: String,
  image: String,
  projects: [],
  /* cohort: ObjectId, */
  cohort: [{ type: Schema.Types.ObjectId, ref: "Cohort" }],
});

// CREATE MODEL
// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Student --> "students"
const Student = mongoose.model("Student", studentSchema);

// EXPORT THE MODEL
module.exports = Student;
