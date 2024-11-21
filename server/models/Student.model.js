const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  linkedinUrl: { type: String, default: "" },
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
  background: { type: String, default: "" },
  image: { type: String, default: "https://i.imgur.com/r8bo8u7.png" },
  projects: Array,
  cohort: {
    type: Schema.Types.ObjectId,
    ref: "cohorts",
  },
});

const students = mongoose.model("student", studentSchema);

// EXPORT THE MODEL
module.exports = students;

/*| Field        | Data Type                            | Description                                  |
|--------------|--------------------------------------|----------------------------------------------|
| `firstName`    | *`String`*                               | First name of the student. Required.        |
| `lastName`     | *`String`*                               | Last name of the student. Required.         |
| `email`        | *`String`*                               | Email address of the student. Required, unique. |
| `phone`        | *`String`*                               | Phone number of the student. Required.      |
| `linkedinUrl`  | *`String`*                               | URL to the student's LinkedIn profile. Default: Empty string. |
| `languages`    | *`Array`* of Strings                     | Spoken languages of the student. Allowed values: "English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other". |
| `program`      | *`String`*                               | Type of program the student is enrolled in. Allowed values: "Web Dev", "UX/UI", "Data Analytics", "Cybersecurity". |
| `background`   | *`String`*                               | Background information about the student. Default: Empty. |
| `image`        | *`String`*                               | URL to the student's profile image. Default: https://i.imgur.com/r8bo8u7.png . |
| `cohort`       | *`ObjectId`*,                            | Reference *_id* of the cohort the student belongs to. |
| `projects`     | *`Array`*                                | Array of the student's projects.   |*/
