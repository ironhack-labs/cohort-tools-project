const router = require("express").Router();
// const students = require("./../students.json")
const Student = require("./../models/Student.model");
const StudentStatic = require("./../students.json");
/**
 * ! All of the routes are prefixed with /api/students
 */
router.get("/", async (req, res, next) => {
  try {
    const allStudents = await Student.find();
    res.json(allStudents);
  } catch (error) {
    console.log(error);
    res.send("Error in the backend, check the console");
  }
});
// router.get("/api/students", (req, res) => {
//   try {
//     res.status(200).json(StudentStatic);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Error in the backend. Please check the console." });
//   }
// });

router.get("/:id", async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const studentsInCohort = await Student.findById(studentId);
    res.status(200).json(studentsInCohort);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error in the backend. Please check the console." });
  }
});

router.get("/cohort/:cohortId", async (req, res, next) => {
  try {
    const id = req.params.cohortId;
    console.log(id);
    const studentsInCohort = await Student.find({
      cohort: id,
    });
    console.log(studentsInCohort);
    res.status(200).json(studentsInCohort);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error in the backend. Please check the console." });
  }
});

router.post("/", async (req, res, next) => {
  Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    cohort: req.body.cohort,
    projects: req.body.projects,
  })
    .then((createdStudent) => res.status(200).json(createdStudent))
    .catch((err) =>
      res.status(500).json({ message: "error creating a student" })
    );
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error editing a student" });
  }
});

router.delete("/:id", (req, res, next) => {
  Student.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res.status((500).json({ message: "error deleting student" }));
    });
});
module.exports = router;
