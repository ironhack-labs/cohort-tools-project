const express = require("express");
const router = express.Router();

const Student = require("../models/Student.model");

// obtener todos los estudiantes
router.get("/", (req, res, next) => {
    Student.find({})
      .populate("cohort")
      .then((students) => {
        console.log("Retrieved student ->", students);
        res.status(200).json(students);
      })
      .catch((error) => {
        next(error)
      });
  });
  
  // crear nuevo estudiante
  router.post("/", async (req, res, next) => {
    console.log(req.body);
  
    let {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      projects,
      cohort,
    } = req.body;
  
    if (image === "") {
      image = "https://i.imgur.com/r8bo8u7.png"
    }
    try {
      const response = await Student.create({
        firstName,
        lastName,
        email,
        phone,
        linkedinUrl,
        languages,
        program,
        background,
        image,
        projects,
        cohort,
      });
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  });
  
  // obtener estudiantes de un cohort determinado por id
  router.get("/cohort/:cohortId", async (req, res, next) => {
    const cohortId = req.params.cohortId;
  
    try {
      const response = await Student.find({ cohort: cohortId }).populate(
        "cohort"
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });
  
  // obtener un estudiante especifico por id
  router.get("/:studentId", async (req, res, next) => {
    try {
      const response = await Student.findById(req.params.studentId).populate(
        "cohort"
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });
  
  // actualiza estudiante por id
  router.put("/:studentId", async (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      projects,
      cohort,
    } = req.body;
  
    try {
      const response = await Student.findByIdAndUpdate(
        req.params.studentId,
        {
          firstName,
          lastName,
          email,
          phone,
          linkedinUrl,
          languages,
          program,
          background,
          image,
          projects,
          cohort,
        },
        { new: true }
      );
      res.status(202).json(response);
    } catch (error) {
      next(error);
    }
  });
  
  // elimina un estudiante por id
  router.delete("/:studentId", async (req, res, next) => {
    try {
      await Student.findByIdAndDelete(req.params.studentId);
      res.status(202).json({ message: "estudiante borrado" });
    } catch (error) {
      next(error);
    }
  });

  module.exports = router