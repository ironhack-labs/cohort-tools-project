/**
 * @swagger
 * components:
 *   schemas:
 *     Cohort:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

const { default: mongoose } = require("mongoose");
const Cohort = require("../models/Cohort.model");

const router = require("express").Router();
// All routes starts with /api/recipes

router.get("/", async (req, res) => {
  try {
    const cohortsData = await Cohort.find();

    res.json(cohortsData);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/cohorts:
 *   get:
 *     summary: Get all cohorts
 *     description: Retrieve a list of all cohorts.
 *     responses:
 *       200:
 *         description: A list of cohorts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cohort'
 */

router.get("/:cohortId", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.cohortId)) {
      res.status(500).json("Invalid Id");
    } else {
      const cohortData = await Cohort.findById(req.params.cohortId);

      res.json(cohortData);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/cohorts/{cohortId}:
 *   get:
 *     summary: Get a cohort by ID
 *     description: Retrieve a specific cohort by its ID.
 *     parameters:
 *       - in: path
 *         name: cohortId
 *         required: true
 *         description: ID of the cohort
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single cohort
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cohort'
 */

router.post("/", async (req, res) => {
  try {
    const newCohort = await Cohort.create(req.body);

    res.status(201).json(newCohort);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/cohorts:
 *   post:
 *     summary: Create a new cohort
 *     description: Create a new cohort.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cohort'
 *     responses:
 *       201:
 *         description: A new cohort is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cohort'
 */

router.put("/:cohortId", async (req, res) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(updatedCohort);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/cohorts/{cohortId}:
 *   put:
 *     summary: Update a cohort by ID
 *     description: Update a specific cohort by its ID.
 *     parameters:
 *       - in: path
 *         name: cohortId
 *         required: true
 *         description: ID of the cohort
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cohort'
 *     responses:
 *       200:
 *         description: A updated cohort
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cohort'
 */

router.delete("/:cohortId", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.cohortId)) {
      res.status(500).json("Invalid Id");
    } else {
      await Cohort.findByIdAndDelete(req.params.cohortId);

      res.status(204);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/cohorts/{cohortId}:
 *   delete:
 *     summary: Delete a cohort by ID
 *     description: Remove a specific cohort by its ID.
 *     parameters:
 *       - in: path
 *         name: cohortId
 *         required: true
 *         description: ID of the cohort
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cohort successfully deleted
 *       500:
 *         description: Invalid ID or server error
 */

module.exports = router;
