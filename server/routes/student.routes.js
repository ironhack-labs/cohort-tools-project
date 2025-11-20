const Student = require("../models/Student.model")
const express = require("express")
const router = express.Router() 

// get student: 
router.get("/", (req, res) => {
  Student.find(req.query)
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students: ", students);
      res.json(students);
    })
    .catch((error) => {
      console.log(error);
      console.log("XXXXXXXXXX ERROR TRIGGERED XXXXXXXXXXXXX");
      // res.status(500).json({ error: "failed to retreive students" });
    });
});

// create new student: 
router.post("/", (req, res) => {
  console.log("received request: ");
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
    projects: req.body.projects,
    cohort: req.body.cohort,
  })
    .then(() => {
      res.send("Student created sucessfully");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:studentId", (req, res) => {

  if(req.params.studentId.length !== 24){
    res.status(400).json({errorMessage: "Not a valid ID."})
    return
  }

  Student.find({ _id: req.params.studentId })
    .populate("cohort")
    .then((student) => {
      res.json(student);
      res.send("success");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.put("/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    projects: req.body.projects,
    cohort: req.body.cohort,
  })
  .then(() => {
    res.send("Document updated");
  })
  .catch((error) => {
    console.log(error);
  });
});


router.delete("/:studentId", (req, res) => {

   if(req.params.studentId.length !== 24){
    res.status(400).json({errorMessage: "Not a valid ID."})
    return
  }
  
  Student.findByIdAndDelete(req.params.studentId)
  .then(() => {
    res.send("Document deleted");
  })
  .catch((error) => {
    console.log(error);
  });
});

module.exports = router