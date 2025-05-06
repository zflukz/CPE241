const db = require('../config/db.js');

exports.getLastBookingPassengerID = async () => {
  const [rows] = await db.execute(
    'SELECT MAX(bookingPassengerID) as lastID FROM BookingPassengers'
  );
  return rows[0].lastID;
};

exports.createBookingPassenger = async (bookingPassengerID, bookingID, passengerID, seatNumber) => {
  await db.execute(
    `INSERT INTO BookingPassengers 
     (bookingPassengerID, bookingID, passengerID, seatNumber) 
     VALUES (?, ?, ?, ?)`,
    [bookingPassengerID, bookingID, passengerID, seatNumber]
  );
};
