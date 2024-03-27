const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - program
 *         - cohort
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the student
 *         firstName:
 *           type: string
 *           description: The first name of the student
 *         lastName:
 *           type: string
 *           description: The last name of the student
 *         email:
 *           type: string
 *           description: The email address of the student
 *         phone:
 *           type: string
 *           description: The phone number of the student
 *         linkedinUrl:
 *           type: string
 *           format: uri
 *           description: The student's profile on Linkedin
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *             enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"]
 *         program:
 *           type: string
 *           enum: ["Web Dev", "UI/UX","Data Analytics","Cybersecurity"]
 *           description: The program the student is enrolled in
 *         background:
 *           type: string
 *           description: Any notable experience the student has
 *         image:
 *           type: string
 *           format: uri
 *           default: https://i.imgur.com/r8bo8u7.png
 *           description: A link to a profile image for this student
 *         cohort:
 *           type: string
 *           format: uuid
 *           description: A link to the ID of the Ironhack cohort that this student is a part of
 *         projects:
 *           type: array
 *           items:
 *             type: string
 *           description: Links to projects submitted by the student during the course
 *       example:
 *         "_id": 1
 *         "firstName": "Christine"
 *         "lastName": "Clayton"
 *         "email": "christine.clayton@example.com"
 *         "phone": "567-890-1234"
 *         "linkedinUrl": "https://linkedin.com/in/christineclaytonexample"
 *         "languages": ["English", "Dutch"]
 *         "program": "Web Dev"
 *         "background": "Computer Engineering"
 *         "image": "https://i.imgur.com/r8bo8u7.png"
 *         "cohort": 1
 *         "projects": []
 */

const studentSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	phone: { type: String, required: true },
	linkedinUrl: String,
	languages: {
		type: [String],
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
	program: {
		type: String,
		enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
	},
	background: String,
	image: { type: String, default: "https://i.imgur.com/r8bo8u7.png" },
	cohort: Schema.Types.ObjectId,
	projects: { type: [String] },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
