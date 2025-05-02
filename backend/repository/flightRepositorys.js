const db = require('../config/db.js');

exports.createFlight = async (flightData) => {
  const [result] = await db.execute(`
    INSERT INTO Flights 
    (label, source, destination, departTime, arrivalTime, availableSeats, price, seat, facilities, flightStatus)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    flightData.label,
    flightData.source,
    flightData.destination,
    flightData.departTime,
    flightData.arrivalTime,
    flightData.availableSeats,
    flightData.price,
    flightData.seat,
    flightData.facilities,
    flightData.flightStatus
  ]);
  return result.insertId;
};

exports.getFlights = async () => {
  const [rows] = await db.execute(`SELECT * FROM Flights`);
  return rows;
};

exports.searchFlightsByRoute = async (source, destination, departDate) => {
  const [rows] = await db.execute(
    `SELECT * FROM Flights 
     WHERE source = ? AND destination = ? AND DATE(departTime) = ?`,
    [source, destination, departDate]
  );
  return rows;
};

exports.searchFlightsRoundTrip = async (departDate, returnDate) => {
  const [rows] = await db.execute(
    `SELECT * FROM Flights 
     WHERE DATE(departTime) = ? AND DATE(arrivalTime) = ?`,
    [departDate, returnDate]
  );
  return rows;
};

exports.searchByMoney = async (min, max) => {
  const [rows] = await db.execute(
    `SELECT * FROM Flights WHERE price BETWEEN ? AND ?`,
    [min, max]
  );
  return rows;
};

exports.deleteFlightByID = async (flightID) => {
  await db.execute(`DELETE FROM Flights WHERE flightID = ?`, [flightID]);
};
