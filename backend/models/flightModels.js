const db = require('../config/db.js');

exports.createFlight = async (flightData) => {
  const [result] = await db.execute(`
    INSERT INTO Flights (label, source, destination, departTime, arrivalTime, availableSeats, price, seat, facilities, flightStatus)
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

  const flightID = result.insertId;
  return `F${flightID.toString().padStart(3, '0')}`;
};

exports.getFlights = async () => {
  const [rows] = await db.execute(`SELECT * FROM Flights`);
  return rows;
};

exports.searchFlightsByRoute = async (db,source , destination) =>{
  const [rows] = await db.query(
    
    `SELECT * FROM Flights F
    JOIN Airport as A ON F.source = A.airportID
    WHERE F.source = ? AND F.destination = ?`,
    [soruce, destination]
  );
  return rows;
}

exports.deleteFlightByID = async (flightID, callback) =>{
  const query = 'DELETE FROM Flights WHERE flightID = ?';
  db.query(query, [flightID], callback);
};