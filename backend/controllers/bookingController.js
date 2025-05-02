const bookingService = require('../services/bookingServices.js');

exports.createFullBooking = async (req, res) => {
  try {
    const { userID, flightID, bookingDate, bookingStatus, passengers } = req.body;
    const bookingID = await bookingService.createFullBooking(userID, flightID, bookingDate, bookingStatus, passengers);
    res.status(201).json({ message: 'Booking with passengers created successfully', bookingID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};





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

exports.getAllBookings = async (req, res) => {
  try {
    const result = await bookingService.getAllBookings();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve bookings', error: err.message });
  }
};

exports.getBookingList = async (req, res) => {
  try {
    const result = await bookingService.getBookingList();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve booking list', error: err.message });
  }
};




exports.editBookingTransaction = async (req, res) => {
  try {
    const result = await bookingService.editBookingTransaction(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update booking transaction', error: err.message });
  }
};

// {
//   "updatedBooking": {
//     "bookingStatus": "CONFIRMED"
//   },
//   "payment": {
//     "paymentDate": "2025-04-29T14:00:00Z",
//     "amount": 1800.00,
//     "paymentMethod": "credit_card",
//     "paymentStatus": "paid"
//   }
// }

