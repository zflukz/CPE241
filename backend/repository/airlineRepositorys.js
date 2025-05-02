const db = require('../config/db.js');


exports.searchAirline = async (airlineName) => {
    const [rows] = await db.query(
      `SELECT * FROM Flights F
       JOIN Airlines AL ON F.airlineID = AL.airlineID
       WHERE AL.airlineName = ?`,
      [airlineName]
    );
    return rows;
  };