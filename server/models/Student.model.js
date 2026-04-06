const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
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
      trim: true,
      lowercase: true,
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
    languages: [
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
    program: {
      type: String,
      enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
    },
    background: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "https://i.imgur.com/r8bo8u7.png",
      trim: true,
    },
    cohort: {
      type: Schema.Types.ObjectId,
      ref: "Cohort",
    },
    projects: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Student = model("Student", studentSchema);

module.exports = Student;