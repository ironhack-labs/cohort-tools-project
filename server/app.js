const express = require("express");
const morgan = require("morgan");

const cookieParser = require("cookie-parser");
const cors = require("cors");

// swagger stuff
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// open api stuff
const oas = require("express-openapi");
const worldsService = require("./paths/worlds.js");
const v1WorldsService = require("./api-v1/services/worldsService");

const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohorts = require("./cohorts.json");
const students = require("./students.json");
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

// open api

oas.initialize({
	app,
	docsPath: "/open-api",
	apiDoc: "./open-api/spec.yaml",
	paths: "./paths",
	dependencies: {
		worldsService: v1WorldsService,
	},
	operations: "./operations",
});

const options = {
	definition: {
		openapi: "3.1.0",
		info: {
			title: "Ironhack Cohort Tools",
			version: "0.1.0",
			description:
				"This is a simple CRUD API application made with Express and documented with Swagger",
			license: {
				name: "MIT",
				url: "https://spdx.org/licenses/MIT.html",
			},
			contact: {
				name: "Ironhaxxors",
				url: "https://ironhack.com",
				email: "info@email.com",
			},
		},
		servers: [
			{
				url: "http://localhost:5005",
			},
		],
	},
	apis: ["./app.js"],
};

const specs = swaggerJsdoc(options);
app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(specs, { explorer: true }),
);

app.use(
	cors({
		origin: ["http://localhost:5173", "http://example.com"], // Add the URLs of allowed origins to this array
	}),
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/open-api-docs", (req, res) => {
	res.sendFile(`${__dirname}/views/stoplight.html`);
});

/**
 * @swagger
 * tags:
 *   name: Docs
 *   description: The docs
 * /docs:
 *   get:
 *     summary: Lists all the API operations
 *     tags: [Docs]
 *     responses:
 *       200:
 *         description: The endpoints supported by this API
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               items:
 *                 type: html
 */
app.get("/docs", (req, res) => {
	res.sendFile(`${__dirname}/views/docs.html`);
});

/**
 * @swagger
 * tags:
 *   name: Cohorts
 *   description: The cohorts
 * /cohorts:
 *   get:
 *     summary: Lists all the cohorts
 *     tags: [Cohorts]
 *     responses:
 *       200:
 *         description: The cohorts at Ironhack
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get("/api/cohorts", (req, res) => {
	res.json(cohorts);
});

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: The students
 * /students:
 *   get:
 *     summary: Lists all the students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: The students enrolled at Ironhack
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get("/api/students", (req, res) => {
	res.json(students);
});

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
 *     Cohort:
 *       type: object
 *       required:
 *         - cohortSlug
 *         - cohortName
 *         - programManager
 *         - leadTeacher
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: The autogenerated unique ID of this cohort
 *         inProgress:
 *           type: boolean
 *           default: false
 *           description: Indicates whether this cohort is currently active
 *         format:
 *           type: string
 *           enum: ["Full Time", "Part Time"]
 *           description: Format of the cohort
 *         cohortSlug:
 *           type: string
 *           pattern: '/^\w{2}-\w{2}-\w+-\d{4}-\d{2}-\d{2}$/'
 *           example: ft-wd-paris-2023-07-03
 *           description: The slug for this cohort in the format `{type}-{program}-{campus}-{start year}-{start month}-{start day}`
 *         cohortName:
 *           type: string
 *           pattern: '/^[A-Z]{2}\s{1}[A-Z]{2}\s{1}[A-Z]+\s{1}\d{4}\s{1}\d{2}$/'
 *           example: FT WD PARIS 2023 07
 *           description: The human-readable short ID for this cohort in the format `{TYPE} {PROGRAM} {CAMPUS} {start year} {start month}`
 *         program:
 *           type: string
 *           enum: ["Web Dev", "UI/UX","Data Analytics", "Cybersecurity"]
 *           description: The program of study for this cohort
 *         campus:
 *           type: string
 *           description: The location this cohort will be based in
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date for this cohort
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The end date for this cohort
 *         programManager:
 *           type: string
 *           description: The program manager who will be taking care of this cohort
 *         leadTeacher:
 *           type: string
 *           description: The teacher who will leading instruction for this cohort
 *         totalHours:
 *           type: integer
 *           description: The total number of hours this cohort will spend in class
 *       example:
 *         "_id": 4
 *         "cohortSlug": "pt-cy-paris-2023-04-03"
 *         "cohortName": "PT CY PARIS 2023 04"
 *         "program": "Cybersecurity"
 *         "format": "Part Time"
 *         "campus": "Paris"
 *         "startDate": "2023-04-03T00:00:00.000Z"
 *         "endDate": "2023-10-03T00:00:00.000Z"
 *         "inProgress": false
 *         "programManager": "Eva Edwards"
 *         "leadTeacher": "Frank Foster"
 *         "totalHours": 360
 */

// START SERVER
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
