const express = require("express");
const router = express.Router();




router.post("/", async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const students = await Student.find().populate("cohort");
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//retrieve all students for a given cohort id
router.get("/cohort/:cohortId", async (req, res) => {
    try {
        const students = await Student.find({
            cohort: req.params.cohortId,
        }).populate("cohort");
        res.json(students);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get one student by id

router.get("/:studentId", async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId).populate("cohort");
        
        if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

            res.json(student);
        } catch (error) {
            res.status(400).json({ error: error.message });

        }
    
});

//update student by id
router.put("/:studentId", async(req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.studentId,
            req.body,
            { new: true }
        );
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//delete student by id

router.delete("/:studentId", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.studentId);
        res.json({ message: "Student deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;