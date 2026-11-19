const {Router} = require ("express")
const router = Router()

const Student = require ("../models/Students-model");

router.post("/", (req, res, next) => {
    Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.lenguages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      projects: req.body.projects,
    })
      .then((newStudent) => {
        res.status(201).json(newStudent);
      })
      .catch((error) => {
        next(error)
      });
  });
  //it works
  router.get("/", (req, res, next)=>{
    Student.find()
    .populate("cohort")
    .then((students)=>{
      res.status(200).json(students)
    })
    .catch((error)=>{
      next (error)
    })
  })
  
  //it works
  router.get("/cohort/:cohortId", (req, res, next)=>{
    const cohortId = req.params.cohortId
    Student.find({cohort: cohortId})
    .populate("cohort")
    .then((students)=>{
      res.status(200).json(students)
    })
    .catch((error)=>{
      next (error)
    })
  })
  
  //it works
  router.get("/:studentId", (req, res,next )=>{
    const studentId = req.params.studentId
    Student.findById(studentId)
    .populate("cohort")
    .then((students)=>{
      res.status(200).json(students)
    })
    .catch((error)=>{
      next (error)
    })
  })
  //it works
  router.put("/:studentId", (req, res, next)=>{
      Student.findByIdAndUpdate(req.params.studentId, req.body,{new: true})
      .then((studentsId)=>{
          res.status(200).json(studentsId)
      })
      .catch((error)=>{
          next(error)
      })
  })
  // it works
  router.delete("/:studentId", (req, res, next)=>{
      Student.findByIdAndDelete(req.params.studentId)
      .then(()=>{
          res.status(204).send()
      })
      .catch((error)=>{
          next(error)
      })
  })

  module.exports = router