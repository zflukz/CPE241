const db = require('../config/db.js');

exports.getBooking = async () => {
  const [rows] = await db.query('SELECT * FROM Bookings');
  return rows;
};

exports.createBookingWithPassengers = async (userID, flightID, bookingData) => {
  try {
    await db.query('START TRANSACTION');

    // Create Booking
    const [[{ count: bookingCount }]] = await db.query('SELECT COUNT(*) AS count FROM Bookings');
    const bookingID = `B${String(bookingCount + 1).padStart(3, '0')}`;

    await db.execute(`
      INSERT INTO Bookings (bookingID, userID, flightID, bookingDate, bookingStatus)
      VALUES (?, ?, ?, NOW(), 'CONFIRMED')
    `, [bookingID, userID, flightID]);

    // For each Passenger
    for (const passenger of bookingData.passengers) {
      const [[{ count: passengerCount }]] = await db.query('SELECT COUNT(*) AS count FROM Passengers');
      const passengerID = `P${String(passengerCount + 1).padStart(3, '0')}`;

      await db.execute(`
        INSERT INTO Passengers (passengerID, passengerFirstname, passengerLastname, sex, birthDate, nationality, phoneNumber, passportNumber)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        passengerID,
        passenger.passengerFirstname,
        passenger.passengerLastname,
        passenger.sex,
        passenger.birthDate,
        passenger.nationality,
        passenger.phoneNumber,
        passenger.passportNumber
      ]);

      const [[{ count: bpCount }]] = await db.query('SELECT COUNT(*) AS count FROM BookingPassengers');
      const bookingPassengerID = `BP${String(bpCount + 1).padStart(3, '0')}`;

      await db.execute(`
        INSERT INTO BookingPassengers (bookingPassengerID, bookingID, passengerID, seatNumber)
        VALUES (?, ?, ?, ?)
      `, [bookingPassengerID, bookingID, passengerID, passenger.seatNumber]);
    }

    await db.query('COMMIT');
    return { bookingID };

  } catch (err) {
    await db.query('ROLLBACK');
    throw err;
  }
};
