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

const Student = require("./models/Students.model");
const Cohort = require("./models/Cohort.model");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

//MONGOOSE
const mongoose = require("mongoose");

mongoose
	.connect("mongodb://127.0.0.1:27017/cohort-tools-api")
	.then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
	.catch((err) => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(
	cors({
		origin: ["http://localhost:5173", "http://example.com"], // Add the URLs of allowed origins to this array
	}),
);

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
	apis: ["./app.js", "./models/*.js"],
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
 *   name: Students
 *   description: The students
 * /docs:
 *   get:
 *     summary: Lists all the students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: The students at Ironhack
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               items:
 *                 type: object
 */
app.get("/api/students", (req, res) => {
	Student.find({})
		.then((students) => {
			console.log("found students ->", students);
			res.json(students);
		})
		.catch((error) => {
			console.error("Error finding students ->", error);
			res.status(500).send({ error: "Lost students" });
		});
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
	Cohort.find({})
		.then((cohorts) => {
			console.log("found cohorts ->", cohorts);
			res.json(cohorts);
		})
		.catch((error) => {
			console.error("Error finding cohorts ->", error);
			res.status(500).send({ error: "Lost cohorts" });
		});
});

// START SERVER
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
