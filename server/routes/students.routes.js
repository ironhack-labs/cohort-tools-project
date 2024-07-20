/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         linkedinUrl:
 *           type: string
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *         program:
 *           type: string
 *         background:
 *           type: string
 *         image:
 *           type: string
 *         cohort:
 *           type: string
 *           description: ID of the linked cohort
 *         projects:
 *           type: array
 *           items:
 *             type: string
 */

const { default: mongoose } = require("mongoose");
const Student = require("../models/Student.model");

const router = require("express").Router();
// All routes starts with /api/recipes

router.get("/", async (req, res) => {
  try {
    const studentsData = await Student.find().populate("cohort");
    res.json(studentsData);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     description: Retrieve a list of all students with linked cohorts.
 *     responses:
 *       200:
 *         description: A list of students with linked cohorts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */

router.get("/:studentId", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.studentId)) {
      res.status(500).json("Invalid Id");
    } else {
      const studentData = await Student.findById(req.params.studentId).populate(
        "cohort"
      );
      res.json(studentData);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/students/{studentId}:
 *   get:
 *     summary: Get a student by ID
 *     description: Retrieve a specific student by their ID along with the linked cohort.
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: ID of the student
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single student with the linked cohort
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 */

router.post("/", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);

    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     description: Add a new student.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: A new student is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 */

router.put("/:studentId", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/students/{studentId}:
 *   put:
 *     summary: Update a student by ID
 *     description: Update a specific student by their ID.
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: ID of the student
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: An updated student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 */

router.delete("/:studentId", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.studentId)) {
      res.status(500).json("Invalid Id");
    } else {
      await Student.findByIdAndDelete(req.params.studentId);

      res.status(204);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/students/{studentId}:
 *   delete:
 *     summary: Delete a student by ID
 *     description: Remove a specific student by their ID.
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: ID of the student
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Student successfully deleted
 *       500:
 *         description: Invalid ID or server error
 */

module.exports = router;
