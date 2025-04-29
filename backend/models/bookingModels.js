const db = require('../config/db.js');

exports.getBooking = async () => {
  const [rows] = await db.query(`SELECT * FROM Bookings`);
  return rows;
};

exports.getLastBookingID = async () => {
  const [rows] = await db.execute('SELECT MAX(bookingID) as lastID FROM Bookings');
  return rows[0].lastID;
};

exports.createBooking = async (bookingID, userID, flightID, bookingDate, bookingStatus) => {
  await db.execute(
    'INSERT INTO Bookings (bookingID, userID, flightID, bookingDate, bookingStatus) VALUES (?, ?, ?, ?, ?)',
    [bookingID, userID, flightID, bookingDate, bookingStatus]
  );
};


exports.bookingList = async () => {
  const [rows] = await db.query(`
    SELECT 
      b.bookingID,
      b.bookingDate,
      b.flightID,
      COUNT(bp.passengerID) AS passengerCount,
      b.bookingStatus,
      GROUP_CONCAT(CONCAT(p.passengerFirstname, ' ', p.passengerLastname) SEPARATOR ', ') AS passengerNames
    FROM Bookings b
    JOIN BookingPassengers bp ON b.bookingID = bp.bookingID
    JOIN Passengers p ON bp.passengerID = p.passengerID
    GROUP BY b.bookingID, b.bookingDate, b.flightID, b.bookingStatus
  `);
  return rows;
};


exports.update