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






exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM BookingPassengers');
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM BookingPassengers WHERE bookingPassengerID = ?', [id]);
  return rows[0];
};

exports.create = async ({ bookingPassengerID, bookingID, passengerID, seatNumber }) => {
  await db.query(
    'INSERT INTO BookingPassengers (bookingPassengerID, bookingID, passengerID, seatNumber) VALUES (?, ?, ?, ?)',
    [bookingPassengerID, bookingID, passengerID, seatNumber]
  );
};

exports.update = async (id, { bookingID, passengerID, seatNumber }) => {
  await db.query(
    'UPDATE BookingPassengers SET bookingID = ?, passengerID = ?, seatNumber = ? WHERE bookingPassengerID = ?',
    [bookingID, passengerID, seatNumber, id]
  );
};

exports.remove = async (id) => {
  await db.query('DELETE FROM BookingPassengers WHERE bookingPassengerID = ?', [id]);
};


//asdas
