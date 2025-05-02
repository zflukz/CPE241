const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController.js');

router.get('/', bookingController.getAllBookings);
//router.post('/', bookingController.createBooking);
router.get('/list', bookingController.getBookingList);
router.put('/transaction', bookingController.editBookingTransaction);
router.post('/create',bookingController.createFullBooking);


module.exports = router;