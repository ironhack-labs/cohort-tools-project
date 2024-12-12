require('./db')


const Cohort = require('./models/cohort.model/cohort.model')

Cohort
    .create({
        inProgress: false,
        cohortSlug: "ft-wd-ironhack",
        cohortName: "FT-WD-madrid",
        program: "webdevelop",
        campus: "madrid",
        startDate: "2023-03-06T00:00:00.000Z",
        endDate: "2023-02-06T00:00:00.000Z",
        programManager: "ivan bm",
        leadTeacher: "john seb",
        totalHours: 420
    })
    .then(createdCohort => console.log('el cohort creado es', createdCohort))
    .catch(err => console.log('te dio error aqui manin', err))
