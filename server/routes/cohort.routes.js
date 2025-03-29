const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Cohort = require("../models/Cohort.model");



router.post("/cohorts",  async (req, res, next) => {
    try {
        const cohort = new Cohort(req.body);
        const savedCohort = await cohort.save();
        res.status(201).json(savedCohort);
    } catch (error) {
        error.status = 400; //Bad Request
        next(error); // Using next() to handle errors
    }
});

// Retrieve all cohorts
router.get("/cohorts",  async (req, res, next) => {
    try {
        const cohorts = await Cohort.find();
        res.json(cohorts);
    } catch (error) {
        error.status = 500; //Bad Request server side
        next(error); // Using next() to handle errors
    }
});

// Retrieve specific cohort by ID
router.get("/cohorts/:cohortId",  async (req, res, next) => {
    try {
        const cohort = await Cohort.findById(req.params.cohortId);
        if (!cohort) {
            const error = new Error("Cohort not found");
            error.status = 404;
            throw error;
        }
        res.json(cohort);
    } catch (error) {
        if (!error.status) error.status = 500; // set 500 if 404 setting above didnt trigger
        next(error);
    }
});

// Updates a specific cohort ID 
router.put("/cohorts/:cohortId",  async (req, res, next) => {
    try {
        const cohort = await Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true });
        if (!cohort) {
            const error = new Error("Cohort not found");
            error.status = 404;
            throw error;
        }
        res.json(cohort);
    } catch (error) {
        if (!error.status) error.status = 400;
        next(error);
    }
});

// Deletes a specific cohort ID
router.delete("/cohorts/:cohortId",  async (req, res, next) => {
    try {
        const cohort = await Cohort.findByIdAndDelete(req.params.cohortId);
        if (!cohort) {
            const error = new Error("Cohort not found");
            error.status = 404;
            throw error;
        }
        res.status(204).send(); // send empty if not found 
    } catch { error } {
        if (!error.status) error.status = 500;
        next(error);
    }
});

module.exports = router;