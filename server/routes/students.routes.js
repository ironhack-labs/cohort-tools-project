const router = require('express').Router();
const Student = require('../models/Student.model');

/* Create our GET all route */
router.get("/students", async (req, res)=>{
    try{
        const allStudents = await Student.find().populate("cohort")
        res.status(200).json(allStudents);
    }
    catch(error){
        res.status(500).json({message: "Error while creating the Students"});
    }
}); 

/* Get by id */
router.get("/students/:id", async (req, res) => {
    try {
        // destructure the id via route params
    const {id} = req.params;
    
        // find the user via Id.
    const singleStudents = await Student.findById(id).populate("cohort")
    res.status(200).json(singleStudents);
    }
    catch (error){
        res.status(500).json({message: "Error while creating the Students"});
    }
})


/* Create */
router.post("/students", async (req, res) => {
    const {firstName, lastName, email, phone, linkedinUrl, languages, program, background, image , cochort , projects } = req.body;

    try{
    const newStudent = await Student.create({firstName, lastName, email, phone, linkedinUrl, languages, program, background, image , cochort , projects });

    res.status(200).json(newStudent);
    }
    catch (error) {
        res.status(500).json({message: "Error while creating the Student"});
    }
})

/* Update */
router.put("/students/:id", async (req, res) => {
    try {
      /* Destructure the id via router params */
      const { id } = req.params;
      /* Find the user via the id and send it back to the client */
      const Student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(Student);
    } catch (error) {
        res.status(500).json({message: "Error while creating the Student"});
    }
  })


  /* Delete */
router.delete("/students/:id", async (req, res) => {
    try {
      /* Destructure the id via route params */
      const { id } = req.params;
      /* Find the user via the id and send it back to the client */
      const deleteStudent = await Student.findByIdAndDelete(req.params.id);
      res.status(204).json(deleteStudent);
    } catch (error) {
        res.status(500).json({message: "Error while creating the Student"});
    }
  })

module.exports = router;



