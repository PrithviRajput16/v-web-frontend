const express = require('express');
const {
    createHospitalTreatment,
    getHospitalTreatments
} = require('../controllers/hospitalTreatmentController.cjs');

const router = express.Router();

router.get('/', getHospitalTreatments);
router.post('/', createHospitalTreatment);

module.exports = router;