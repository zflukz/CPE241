const db = require('../config/db');

exports.countCanceledBookings = async () => {
  const [[{ count }]] = await db.query(`SELECT COUNT(*) AS count FROM Bookings WHERE bookingStatus = 'canceled'`);
  return count;
};

exports.countActiveBookings = async () => {
  const [[{ count }]] = await db.query(`SELECT COUNT(*) AS count FROM Bookings WHERE bookingStatus != 'canceled'`);
  return count;
};

exports.sumRevenueAllFlights = async () => {
  const [[{ totalRevenue }]] = await db.query(`
    SELECT SUM(f.price) * COUNT(t.ticketID) AS totalRevenue
    FROM Flights f
    JOIN Tickets t ON f.flightID = t.flightID
    WHERE t.ticketStatus = 'used'
  `);
  return totalRevenue;
};

exports.revenuePerFlight = async () => {
  const [rows] = await db.query(`
    SELECT f.flightID, f.label, COUNT(t.ticketID) AS ticketsSold, f.price,
           COUNT(t.ticketID) * f.price AS totalRevenue
    FROM Flights f
    JOIN Tickets t ON f.flightID = t.flightID
    WHERE t.ticketStatus = 'used'
    GROUP BY f.flightID, f.label, f.price
    ORDER BY totalRevenue DESC
  `);
  return rows;
};

exports.topFiveAirlines = async () => {
  const [rows] = await db.query(`
    SELECT a.airlineID, a.airlineName, SUM(f.price) AS totalRevenue
    FROM Airlines a
    JOIN Flights f ON a.airlineID = f.airlineID
    JOIN Tickets t ON f.flightID = t.flightID
    WHERE t.ticketStatus = 'used'
    GROUP BY a.airlineID, a.airlineName
    ORDER BY totalRevenue DESC
    LIMIT 5
  `);
  return rows;
};

exports.cancelStatsByInterval = async (interval) => {
  const [[{ total }]] = await db.query(`
    SELECT COUNT(*) AS total 
    FROM Bookings 
    WHERE bookingDate >= DATE_SUB(NOW(), INTERVAL ${interval})
  `);

  const [[{ canceled }]] = await db.query(`
    SELECT COUNT(*) AS canceled 
    FROM Bookings 
    WHERE bookingStatus = 'canceled'
      AND bookingDate >= DATE_SUB(NOW(), INTERVAL ${interval})
  `);

  return { total, canceled };
};

exports.top3RoutesRevenue = async () => {
  const [rows] = await db.query(`
    SELECT 
      f.source,
      f.destination,
      CONCAT(f.source, ' → ', f.destination) AS route,
      COUNT(t.ticketID) AS ticketsSold,
      f.price,
      SUM(f.price) AS revenuePerTicket, 
      COUNT(t.ticketID) * f.price AS totalRevenue
    FROM Flights f
    JOIN Tickets t ON f.flightID = t.flightID
    WHERE t.ticketStatus = 'used'
    GROUP BY f.source, f.destination, f.price
    ORDER BY totalRevenue DESC
    LIMIT 3
  `);
  return rows;
};
