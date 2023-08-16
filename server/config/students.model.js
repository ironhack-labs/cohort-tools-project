const {Schema, model, SchemaTypes} = require('mongoose')

const studentsSchema = new Schema(
    {
        firstName: {
            type: String, 
            require: true,
        },
        lastName: {
            type: String, 
            require: true, 
        },
        email: {  
            type: String, 
            require: true,
            unique: true,
        },
        phone: { 
            type: String, 
            require: true, 
        },
        linkedinUrl:{
            type: String, 
            default: " ",
        },
        languages: {
            type: String,
            enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"],
        },
        program: {
            type: String, 
            enum: ["UX/UI", "Web Dev", "Data Analyticis", "Cybersecurity"]
        },
        background: {
            type: String, 
            default: " ",
        },
        image: {
            type: String,
            default: "https://i.imgur.com/r8bo8u7.png",
        },
        cohort:{
            type: Schema.Types.ObjectId,
            ref: " ",
        },
        projects: [String],
}, {
    timestamps: true,
    }
)

const Students = model("Student", studentsSchema)

module.exports = Student