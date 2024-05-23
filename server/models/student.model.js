

const { model, Schema } = require("mongoose")

const studentSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: [String],
    program: String,
    background: String,
    image: String,
    cohort: {
        type: Schema.ObjectId,
        ref: 'Cohort'
    },
    projects: []
})

const Student = model("Student", studentSchema)

module.exports = Student