const { Schema, model } = require("mongoose");
const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },

  phone: {
    type: String,
    required: true,
    trim: true,
  },

  linkedinUrl: {
    type: String,
    default: "",
    trim: true,
  },

  languages: {
    type: [
      {
        type: String,
        enum: [
          "English",
          "Spanish",
          "French",
          "German",
          "Portuguese",
          "Dutch",
          "Other",
        ],
      },
    ],
    default: [],
  },

  program: {
    type: String,
    required: true,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },

  background: {
    type: String,
    default: "",
  },

  image: {
    type: String,
    default: "https://i.imgur.com/r8bo8u7.png",
  },

  cohort: {
    type: Schema.Types.ObjectId,
    ref: "Cohort",
    required: true,
  },

  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});
const StudentModel = model("student", studentSchema);
module.exports = StudentModel;
