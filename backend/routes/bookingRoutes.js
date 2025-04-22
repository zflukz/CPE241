const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/create', bookingController.createBooking);
router.get('/' , booking.bookingController.getAll)

module.exports = router;