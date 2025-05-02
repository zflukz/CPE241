const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController.js');

router.post('/create', bookingController.createFullBooking);
router.get('/' , bookingController.getBooking);
router.get('/list' , bookingController.bookingList);
//router.delete('/' , bookingController.deleteBooking);
router.put('/editFullBooking', bookingController.editFullBooking);

module.exports = router;