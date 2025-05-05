const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController.js');

router.get('/', bookingController.getAllBookings);
//router.post('/', bookingController.createBooking);
router.get('/list', bookingController.getBookingList);



//UPDATE booking ฝั้ง admin
router.put('/transaction', bookingController.editBookingTransaction);


//-------------------------------------------------------------------------------------//
//สร้าง booking ฝั้ง USERs
router.post('/create',bookingController.createFullBooking);
//example Data : 
// {
//   "userID": "U001",
//   "flightID": "F001",
//   "bookingDate": "2025-04-28",
//   "bookingStatus": "Confirmed",
//   "passengers": [
//     {
//       "passengerFirstname": "John",
//       "passengerLastname": "Doe",
//       "sex": "Male",
//       "birthDate": "1990-01-01",
//       "nationality": "Thai",
//       "phoneNumber": "0987654321",
//       "passportNumber": "P123456789",
//       "seatNumber": "A1"
//     }
//   ]
// }
//-------------------------------------------------------------------------------------//

module.exports = router;