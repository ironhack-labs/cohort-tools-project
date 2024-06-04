const { Schema, model } = require("mongoose");
const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    linkedinUrl: {
      type: String,
      default: "",
    },
    languages: [
      "English",
      "Spanish",
      "French",
      "German",
      "Portuguese",
      "Dutch",
      "Other",
    ],
    background: {
      type: String,
      default: "",
    },
    program: {
      type: String,
      enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
    },
    image: {
      type: String,
      default:
        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg ",
    },
    cohort: {
      type: Schema.Types.ObjectId,
      ref: "Cohort",
    },
    projects: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Student = model("Students", studentSchema);
module.exports = Student;
