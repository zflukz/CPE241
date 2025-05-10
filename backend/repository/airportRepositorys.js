
const db = require('../config/db.js');

exports.getAirports = async () => {
  const [rows] = await db.execute(`SELECT airportID, airportLabel FROM Airports`);
  return rows;
};


exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM Airports');
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Airports WHERE airportID = ?', [id]);
  return rows[0];
};

exports.create = async ({ airportID, airportLabel, cityID, code }) => {
  await db.query(
    'INSERT INTO Airports (airportID, airportLabel, cityID, code) VALUES (?, ?, ?, ?)',
    [airportID, airportLabel, cityID, code]
  );
};

exports.update = async (id, { airportLabel, cityID, code }) => {
  await db.query(
    'UPDATE Airports SET airportLabel = ?, cityID = ?, code = ? WHERE airportID = ?',
    [airportLabel, cityID, code, id]
  );
};

exports.remove = async (id) => {
  await db.query('DELETE FROM Airports WHERE airportID = ?', [id]);
};