const Cohort = require("../models/cohort.model")

// Import the router
const router = require("express").Router()
const getQuery = require("../utils/index")


//post

router.post("/api/cohorts", (req, res, next) => {
    Cohort.create({
        inProgress: req.body.inProgress,
        cohortSlug: req.body.cohortSlug,
        cohortName: req.body.cohortName,
        program: req.body.program, 
        campus: req.body.campus,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        inProgress: req.body.inProgress,
        programManager: req.body.programManager, 
        leadTeacher: req.body.leadTeacher, 
        totalHours: req.body.totalHours
    })
    .then((createdCohort) => {
        res.status(201).json(createdCohort)
    })
    .catch((error) => {
        // res.status(500).json({message: "Error while creating a new cohort"})
    next(error)
    })  
})


// get
router.get("/", async (req, res, next) => {
	console.log(req.query)
	const { program, campus } = req.query
	const query = getQuery(program, campus)
	try {
		const allCohorts = await Cohort.find(query)
		res.json(allCohorts)
	} catch (error) {
		// console.log(error)
        next(error)
	}
})


// router.get("/", (req, res) => {
//     Cohort.find()
//         .then((allCohorts) => {
//             res.status(200).json(allCohorts)
//         })
//         .catch((error) => {
//             res.status(500).json({message: "Error while getting all cohorts"})
//         })
// })

//ASK  GET /api/cohorts/:cohortId 

// router.get("/:cohortId", (req, res) => {
//     const cohortId = req.params.cohortId;

//     // Assuming your Student schema has a field 'cohortId' to represent the cohort they belong to
//     Cohort.find({ _id: cohortId })
//         .then(cohorts => {
//             res.json(cohorts);
//         })
//         .catch(err => {
//             res.status(500).json({ error: 'An error occurred.' });
//         });
// });

router.get("/:cohortId", async (req, res, next) => {
    try {
        const oneStudent = await Cohort.findById(req.params.cohortId)
        res.json(oneStudent)
    } catch (error) {
        // console.log(error)
        next(error)
    }
 })

//PUT  /api/cohorts/:cohortId
router.put("/:cohortId",(req, res, next) => {
    Cohort.findByIdAndUpdate(req.params.cohortId, req.body, {new:true})
        .then((updatedCohorts) => {
            res.status(200).json(updatedCohorts)
        })
        .catch((error) => {
            // res.status(500).json({message: "Error while updating cohort"})
            next(error)
        })
})

//DELETE /api/cohorts/:cohortId
router.delete("/:cohortId", (req, res, next) => {
    Cohort.findByIdAndDelete(req.params.cohortId)
        .then(() =>{
            res.status(204).send()
        })
        .catch((error) => {
            // res.status(500).json({message: "Error while deleting a single cohort"})
            next(error)
        })
})

// Export the router
module.exports = router
