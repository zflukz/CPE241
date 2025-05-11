const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM Baggages');
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Baggages WHERE baggageID = ?', [id]);
  return rows[0];
};

exports.create = async ({ baggageID, passengerID, flightID, baggageOptionID, type, status }) => {
  await db.query(
    'INSERT INTO Baggages (baggageID, passengerID, flightID, baggageOptionID, type, status) VALUES (?, ?, ?, ?, ?, ?)',
    [baggageID, passengerID, flightID, baggageOptionID, type, status]
  );
};

exports.update = async (id, { passengerID, flightID, baggageOptionID, type, status }) => {
  await db.query(
    'UPDATE Baggages SET passengerID = ?, flightID = ?, baggageOptionID = ?, type = ?, status = ? WHERE baggageID = ?',
    [passengerID, flightID, baggageOptionID, type, status, id]
  );
};

exports.remove = async (id) => {
  await db.query('DELETE FROM Baggages WHERE baggageID = ?', [id]);
};
