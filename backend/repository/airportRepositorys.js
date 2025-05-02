
const db = require('../config/db.js');

exports.getAirports = async () => {
  const [rows] = await db.execute(`SELECT airportID, airportLabel FROM Airports`);
  return rows;
};
