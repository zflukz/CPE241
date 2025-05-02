const bookingModel = require('../models/bookingModels.js');
const passengerModel = require('../models/passengerModels.js');
const bookingPassengerModel = require('../models/bookingPassengerModels.js');


// ฟังก์ชันสร้างรหัสใหม่
function generateNewID(lastID, prefix) {
  if (!lastID) return `${prefix}001`;
  const lastNumber = parseInt(lastID.replace(prefix, ''), 10);
  const newNumber = lastNumber + 1;
  return `${prefix}${newNumber.toString().padStart(3, '0')}`;
}

// Controller function
exports.createFullBooking = async (req, res) => {
  try {
    const { userID, flightID, bookingDate, bookingStatus, passengers } = req.body;

    if (!passengers || passengers.length === 0 || passengers.length > 4) {
      throw new Error('Passengers must be between 1 and 4.');
    }

    // 1. Gen Booking ID
    const lastBookingID = await bookingModel.getLastBookingID();
    const bookingID = generateNewID(lastBookingID, 'B');

    await bookingModel.createBooking(bookingID, userID, flightID, bookingDate, bookingStatus);

    // 2. Loop สร้าง Passenger + BookingPassenger
    for (const passenger of passengers) {
      const lastPassengerID = await passengerModel.getLastPassengerID();
      const passengerID = generateNewID(lastPassengerID, 'P');

      await passengerModel.createPassenger(passengerID, passenger);

      const lastBookingPassengerID = await bookingPassengerModel.getLastBookingPassengerID();
      const bookingPassengerID = generateNewID(lastBookingPassengerID, 'BP');

      const seatNumber = passenger.seatNumber || null;
      await bookingPassengerModel.createBookingPassenger(bookingPassengerID, bookingID, passengerID, seatNumber);
    }

    res.status(201).json({ message: 'Booking with passengers created successfully', bookingID });

  } catch (err) {
    console.log(err)
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

exports.getBooking = async (req,res) =>{
  try{
    const bookings = await bookingModel.getBooking();
    res.status(200).json(bookings);
  }
  catch(err){
    res.status(500).json(err);
  }
}

exports.bookingList = async (req,res) =>{
  try{
    const bookingList = await bookingModel.bookingList();
    res.status(200).json(bookingList);
  }
  catch(err){
    res.status(500).json(err);
  }
}




exports.editFullBooking = async (req, res) => {
  try {
    const result = await bookingModel.editBookingTransaction(req.body);
    res.status(200).json({ message: 'Edit success', result });
  } catch (error) {
    res.status(500).json({ message: 'Edit failed', error: error.message });
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

