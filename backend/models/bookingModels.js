const db = require('../config/db.js')


exports.getBooking = async () => {
    const [rows] = await db.execute(`SELECT * FROM Bookings`);
    return rows;
};