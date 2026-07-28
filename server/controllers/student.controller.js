import Student from "../models/Student.model.js";

async function getStudents(req, res) {
  try {
    const students = await Student.find().populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting students" });
  }
}

async function getStudentsByCohort(req, res) {
  try {
    const { cohortId } = req.params;
    const students = await Student.find({ cohort: cohortId }).populate("cohort");
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting students for cohort" });
  }
}

async function getStudent(req, res) {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate("cohort");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting student" });
  }
}

async function createStudent(req, res) {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating student" });
  }
}

async function updateStudent(req, res) {
  try {
    const { studentId } = req.params;
    const updated = await Student.findByIdAndUpdate(studentId, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating student" });
  }
}

async function deleteStudent(req, res) {
  try {
    const { studentId } = req.params;
    const deleted = await Student.findByIdAndDelete(studentId);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting student" });
  }
}

export {
  getStudents,
  getStudentsByCohort,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};