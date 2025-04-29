const db = require('../config/db.js');



exports.totalCancel = async () => {
    const [[{ count }]] = await db.query(`
      SELECT COUNT(*) AS count FROM Bookings WHERE bookingStatus = 'canceled'
    `);
    return count;
  };

  exports.totalBooking = async () => {
    const [[{ count }]] = await db.query(`
      SELECT COUNT(*) AS count FROM Bookings WHERE bookingStatus != 'canceled'
    `);
    return count;
  };

  exports.totalRevenuePerFlight = async () => {
    const [rows] = await db.query(`
      SELECT 
        f.flightID,
        f.label,
        COUNT(t.ticketID) AS ticketsSold,
        f.price,
        COUNT(t.ticketID) * f.price AS totalRevenue
      FROM Flights f
      JOIN Tickets t ON f.flightID = t.flightID
      WHERE t.ticketStatus = 'used'
      GROUP BY f.flightID, f.label, f.price
      ORDER BY totalRevenue DESC
    `);
    return rows;
  };
  
  