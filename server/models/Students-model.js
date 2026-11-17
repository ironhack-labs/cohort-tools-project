const mongoose = require("mongoose")

const schema = new mongoose.Schema({
// firstName: String,
// lastName: String,
// email: String, 
// phone: Number, 
// linkedinUrl: String, 
// languages: Array (2),
// program: String, 
// background: String, 
// image: String, 
// projects: Array (empty)
})

const Students = mongoose.model("Students", schema)
module.exports = Students 