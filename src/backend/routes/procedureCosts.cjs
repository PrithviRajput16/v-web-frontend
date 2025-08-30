const express = require('express');
const { getProcedureCosts } = require('../controllers/procedureCostController.cjs');

const router = express.Router();

router.get('/', getProcedureCosts);

module.exports = router;