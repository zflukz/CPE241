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

//หาเที่ยวบินจาก จุดเริ่มไปจุดหมาย + เวลาไป
exports.searchFlightsByRoute = async (db,source , destination, departTime) =>{
  const [rows] = await db.query(
    `SELECT * FROM Flights F
    JOIN Airports as A ON F.source = A.airportID
    WHERE F.source = ? AND F.destination = ? AND CAST (F.departTime as date)  = ?`,
    [source, destination, departTime]
  );
  return rows;
}
// หาเที่ยวบินจากวันไปเเละกลับ
exports.searchFlightsRoundTrip = async (db, departTime, arrivalTime) =>{
  const [rows] = await db.query(
    `SELECT * FROM Flights F
    JOIN Airports as A ON F.source = A.airportID
    WHERE CAST (F.departTime as date)  = ? AND CAST (F.arrivalTime as date)= ?`,
    [departTime, arrivalTime]
  );
  return rows;
}

exports.searchByMoney = async (db, money1, money2) => {
  const [rows] = await db.query(
    `SELECT * FROM Flights F
    WHERE price between ? AND ?`,
    [money1,money2]
  )
  return rows;
}



exports.deleteFlightByID = async (flightID, callback) =>{
  const query = 'DELETE FROM Flights WHERE flightID = ?';
  db.query(query, [flightID], callback);
};