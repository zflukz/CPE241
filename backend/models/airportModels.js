const db = require("../config/db.js")


exports.getairport = async () => {
    const [rows] = await db.execute(`SELECT airportID, airportLabel FROM Airports`);
    return rows;
}