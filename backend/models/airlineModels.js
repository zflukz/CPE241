const db = require('../config/db.js');


exports.searchAirline = async (db , airlineName) =>{
    const [rows] = await db.query(
        `SELECT * FROM Flights F
        JOIN Airlines as AL ON F.airlineID = AL.airlineID
        WHERE airlineName = ?`,
        [airlineName]
    );
    return rows;
}