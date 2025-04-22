const db = require('../config/db.js')



exports.getBooking = async () => {
    const [rows] = await db.execute(`SELECT * FROM Bookings`);
    return rows;
};

// exports.bookingList = async () => {
//     const [rows] = await db.execute(
//         `SELECT b.bookingDate, 
//                 b.bookingID, 
//                 f.flightID, 
//                 bp.seat, 
//                 p.passengerFirstname,
//                 p.passengerLastname`
//     )
// }

