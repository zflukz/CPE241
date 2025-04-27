const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passengerController');

// POST /api/passengers
router.post('/create', passengerController.createPassenger);

module.exports = router;
