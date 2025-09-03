const express = require('express');
const {
    createDoctorTreatment,
    getDoctorTreatments,
    getDoctorsByTreatment,
    getTreatmentsByDoctor
} = require('../controllers/doctorTreatmentController.cjs');

const router = express.Router();

router.get('/', getDoctorTreatments);
router.get('/by-treatment/:treatmentId', getDoctorsByTreatment);
router.get('/by-doctor/:hospitalId', getTreatmentsByDoctor);
router.post('/', createDoctorTreatment);

module.exports = router;