const express = require('express');
const {
  getHospitals,
  getHospital,
  createHospital,
  getHospitalStatus
} = require('../controllers/hospitalController.cjs');

const router = express.Router();

router.get('/', getHospitalStatus)
router.get('/all', getHospitals);
router.get('/:id', getHospital);
router.post('/create', createHospital);

module.exports = router;