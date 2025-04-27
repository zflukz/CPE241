const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController.js');

router.post('/create', bookingController.createBookingWithPassengers);
router.get('/' , bookingController.getBooking);
//router.delete('/' , bookingController.deleteBooking);

module.exports = router;