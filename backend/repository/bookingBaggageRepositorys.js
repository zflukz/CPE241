const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM BookingBaggages');
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM BookingBaggages WHERE bookingBaggageID = ?', [id]);
  return rows[0];
};

exports.create = async ({ bookingBaggageID, bookingID, passengerID, baggageOptionID, quantity }) => {
  await db.query(
    'INSERT INTO BookingBaggages (bookingBaggageID, bookingID, passengerID, baggageOptionID, quantity) VALUES (?, ?, ?, ?, ?)',
    [bookingBaggageID, bookingID, passengerID, baggageOptionID, quantity]
  );
};

exports.update = async (id, { bookingID, passengerID, baggageOptionID, quantity }) => {
  await db.query(
    'UPDATE BookingBaggages SET bookingID = ?, passengerID = ?, baggageOptionID = ?, quantity = ? WHERE bookingBaggageID = ?',
    [bookingID, passengerID, baggageOptionID, quantity, id]
  );
};

exports.remove = async (id) => {
  await db.query('DELETE FROM BookingBaggages WHERE bookingBaggageID = ?', [id]);
};
