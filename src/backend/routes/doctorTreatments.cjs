const express = require('express');
const {
    createDoctorTreatment,
    getDoctorTreatments
} = require('../controllers/doctorTreatmentController.cjs');

const router = express.Router();

router.get('/', getDoctorTreatments);
router.post('/', createDoctorTreatment);

module.exports = router;