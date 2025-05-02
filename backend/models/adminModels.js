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






  exports.totalRevenueAllFlightsSum = async () => {
    const [[{ totalRevenue }]] = await db.query(`
      SELECT 
        SUM(f.price) * COUNT(t.ticketID) AS totalRevenue
      FROM Flights f
      JOIN Tickets t ON f.flightID = t.flightID
      WHERE t.ticketStatus = 'used'
    `);
    return totalRevenue;
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
  
  exports.topfiveAirline = async () => {
    const [rows] = await db.query(`
      SELECT 
        a.airlineID,
        a.airlineName,
        SUM(f.price) AS totalRevenue
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
  

  exports.cancelStats = async () => {
    // === 1 WEEK ===
    const [[{ totalWeek }]] = await db.query(`
      SELECT COUNT(*) AS totalWeek 
      FROM Bookings 
      WHERE bookingDate >= DATE_SUB(NOW(), INTERVAL 1 WEEK)
    `);
  
    const [[{ canceledWeek }]] = await db.query(`
      SELECT COUNT(*) AS canceledWeek 
      FROM Bookings 
      WHERE bookingStatus = 'canceled'
        AND bookingDate >= DATE_SUB(NOW(), INTERVAL 1 WEEK)
    `);
  
    const cancelRateWeek = totalWeek === 0 ? 0 : (canceledWeek / totalWeek) * 100;
  
    // === 1 MONTH ===
    const [[{ totalMonth }]] = await db.query(`
      SELECT COUNT(*) AS totalMonth 
      FROM Bookings 
      WHERE bookingDate >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
    `);
  
    const [[{ canceledMonth }]] = await db.query(`
      SELECT COUNT(*) AS canceledMonth 
      FROM Bookings 
      WHERE bookingStatus = 'canceled'
        AND bookingDate >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
    `);
  
    const cancelRateMonth = totalMonth === 0 ? 0 : (canceledMonth / totalMonth) * 100;
  
    // === 1 YEAR ===
    const [[{ totalYear }]] = await db.query(`
      SELECT COUNT(*) AS totalYear 
      FROM Bookings 
      WHERE bookingDate >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
    `);
  
    const [[{ canceledYear }]] = await db.query(`
      SELECT COUNT(*) AS canceledYear 
      FROM Bookings 
      WHERE bookingStatus = 'canceled'
        AND bookingDate >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
    `);
  
    const cancelRateYear = totalYear === 0 ? 0 : (canceledYear / totalYear) * 100;
  
    return {
      oneWeek: {
        canceled: canceledWeek,
        total: totalWeek,
        cancelRate: cancelRateWeek.toFixed(2) + '%'
      },
      oneMonth: {
        canceled: canceledMonth,
        total: totalMonth,
        cancelRate: cancelRateMonth.toFixed(2) + '%'
      },
      oneYear: {
        canceled: canceledYear,
        total: totalYear,
        cancelRate: cancelRateYear.toFixed(2) + '%'
      }
    };
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
  