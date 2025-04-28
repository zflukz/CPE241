const express = require('express');
const router = express.Router();
const airportController = require('../controllers/airportController.js');

router.get('/' , airportController.getAirports);
//router.delete('/' , bookingController.deleteBooking);

module.exports = router;