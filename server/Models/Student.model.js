const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: String,
    linkedinUrl: String,

    languages: {
      type: [String],
      default: [],
    },

    program: {
      type: String,
      enum: ["Web Dev", "UX/UI", "Data Analytics"],
      required: true,
    },

    background: String,

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
