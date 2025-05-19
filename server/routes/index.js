const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/cohorts', require('./cohort.routes'));
router.use('/students', require('./student.routes'));

module.exports = router;
