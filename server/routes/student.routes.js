const router = require('express').Router();

const Student = require('../models/Student.model');

router.post('/students', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinURL,
    languages,
    program,
    background,
    image,
    cohort
  } = req.body

  Student.create({
    firstName,
    lastName,
    email,
    phone,
    linkedinURL,
    languages,
    program,
    background,
    image,
    cohort
  })
    .then((student) => {
      console.log('Student created:', student);
      res.status(201).json(student);
    })
    .catch((err) => {
      console.log('Error creating student:', err);
      res.status(500).json({ error: 'Failed to create student' });
    });
    
});

router.get('/students', (req, res) => {
  Student.find({})
    .populate('cohort')
    .then((students) => {
      console.log("Retrived cohorts ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({error: "Failed to retrieve students"});
    });
});

router.get('/students/cohort/:id', (req, res) => {
  const { id } = req.params;

  Student.find({ cohort: id })
    .populate('cohort')
    .then((students) => {
      console.log(`"Retrived students fror cohort ${id}"`)
      res.json(students);
    })
    .catch((error) => {
      console.error('Error getting students of cohort', error)
      res.status(500).json({ error: "Failed to retrive students of cohort" })
    });
});

router.get("/students/:id", (req, res) => {
  const { id } = req.params;

  Student.findById(id)
    .populate('cohort')
    .then((student) => {
      if(!student) {
        return res.status(404).json({error: 'Student not found' })
      }

      res.status(200).json(student)
    })
    .catch((error)=> {
      console.error('Error getting student by Id', error);
      res.status(500).json({ error: 'Failed to get student by Id'});
    });
});

router.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinURL,
    languages,
    program,
    background,
    image,
    cohort
  } = req.body;

  Student.findByIdAndUpdate(id, 
    {
      firstName,
      lastName,
      email,
      phone,
      linkedinURL,
      languages,
      program,
      background,
      image,
      cohort
    },
    {new : true}
  )
  .then((student) => {
    if(!student){
      return res.status(404).json({error: 'Student not found'});
    }
    res.json(student)
  })
  .catch((error) => {
    console.error('Error updating student by Id', error);
    res.status(500).json({error: 'Fail to update student by Id'});
  });
});

router.delete("/students/:id", (req, res) => {
  const { id } = req.params;

  Student.findByIdAndDelete(id)
  .then((student)=>{
    if(!student){
      return res.status(404).json({error: 'Student not found'})
    }
    res.json(student)
  })
  .catch((error)=> {
    console.log(error('Error deleting student by Id', error));
    res.status(500).json({error: 'Fail to delete student by Id'})
  });
});

module.exports = router