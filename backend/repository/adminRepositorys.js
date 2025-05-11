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

exports.getTop3RoutesRevenue = async (interval) => {
  
  const [rows] = await db.query(`
    SELECT 
      f.source,
      f.destination,
      a1.airportLabel AS sourceLabel,
      a2.airportLabel AS destinationLabel,
      CONCAT(a1.airportLabel, ' → ', a2.airportLabel) AS route,
      COUNT(t.ticketID) AS ticketsSold,
      f.price,
      SUM(f.price) AS revenuePerTicket, 
      COUNT(t.ticketID) * f.price AS totalRevenue
    FROM Flights f
    JOIN Airports a1 ON f.source = a1.airportID
    JOIN Airports a2 ON f.destination = a2.airportID
    JOIN Tickets t ON f.flightID = t.flightID
    JOIN Payments p ON t.bookingID = p.bookingID
    WHERE 
      t.ticketStatus = 'used'
      AND p.paymentDate >= (NOW() - INTERVAL ${interval})
    GROUP BY f.source, f.destination, f.price
    ORDER BY totalRevenue DESC
    LIMIT 3
  `);

  return rows;
};





exports.customerProfile = async (bookingID) => {
  const [rows] = await db.query(`
    SELECT 
      f.label,
      al.airlineName,
      f.source,
      f.destination,
      f.departTime,
      f.arrivalTime,
      bp.seatNumber,
      CONCAT(p.passengerFirstname, ' ', p.passengerLastname) AS passengerFullname,
      f.seat AS seatClass
    FROM BookingPassengers bp
    JOIN Passengers p ON bp.passengerID = p.passengerID
    JOIN Bookings b ON bp.bookingID = b.bookingID
    JOIN Flights f ON b.flightID = f.flightID
    JOIN Airlines al ON f.airlineID = al.airlineID 
    WHERE b.bookingID = ?
  `, [bookingID]);

  return rows;
};

//---------------------------------Reported------------------------------------------------//
exports.getFlightRoutePerformance = async (startDate, endDate) => {
  const [rows] = await db.query(`
    SELECT
      src.airportLabel AS sourceAirport,
      dest.airportLabel AS destinationAirport,
      COUNT(DISTINCT f.flightID) AS totalFlights,
      COUNT(DISTINCT fs.scheduleID) AS totalSchedules,
      COUNT(DISTINCT b.bookingID) AS totalBookings,
      COUNT(DISTINCT t.ticketID) AS totalTickets,
      COUNT(DISTINCT bp.passengerID) AS totalPassengers,
      COALESCE(SUM(p.amount), 0) AS totalRevenue,
      ROUND(
        (COUNT(DISTINCT bp.passengerID) / SUM(f.availableSeats)) * 100,
        2
      ) AS loadFactorPercent,
      ROUND(
        (SUM(CASE WHEN f.flightStatus = 'cancel' THEN 1 ELSE 0 END) / COUNT(f.flightID)) * 100,
        2
      ) AS cancelRatePercent,
      ROUND(
        (SUM(CASE WHEN f.flightStatus = 'delay' THEN 1 ELSE 0 END) / COUNT(f.flightID)) * 100,
        2
      ) AS delayRatePercent
    FROM Flights f
    JOIN Airports src ON f.source = src.airportID
    JOIN Airports dest ON f.destination = dest.airportID
    LEFT JOIN FlightSchedules fs ON f.flightID = fs.flightID
    LEFT JOIN Bookings b ON f.flightID = b.flightID
    LEFT JOIN BookingPassengers bp ON b.bookingID = bp.bookingID
    LEFT JOIN Payments p ON b.bookingID = p.bookingID
    LEFT JOIN Tickets t ON b.bookingID = t.bookingID
    WHERE fs.scheduleDate BETWEEN ? AND ?
    GROUP BY f.source, f.destination
  `, [startDate, endDate]);

  return rows;
};




exports.getFlightSummary = async (startDate, endDate) => {
  const [rows] = await db.query(`
    SELECT 
      DATE_FORMAT(fs.scheduleDate, '%Y-%m-%d') AS date,
      COUNT(DISTINCT b.bookingID) AS totalBooking,
      SUM(CASE WHEN b.bookingStatus = 'confirmed' THEN 1 ELSE 0 END) AS completedBooking,
      SUM(CASE WHEN b.bookingStatus = 'canceled' THEN 1 ELSE 0 END) AS canceledBooking,
      COALESCE(SUM(CASE WHEN b.bookingStatus = 'confirmed' THEN p.amount ELSE 0 END), 0) AS revenue
    FROM Bookings b
    JOIN Flights f ON b.flightID = f.flightID
    JOIN FlightSchedules fs ON f.flightID = fs.flightID
    LEFT JOIN Payments p ON b.bookingID = p.bookingID
    WHERE fs.scheduleDate BETWEEN ? AND ?
    GROUP BY fs.scheduleDate
    ORDER BY fs.scheduleDate ASC
  `, [startDate, endDate]);
  return rows;
};


//-----------------------------------------//
exports.getCanceledTicketReport = async (startDate, endDate) => {
  const [rows] = await db.query(`
    SELECT 
      b.bookingDate,
      COUNT(t.ticketID) AS totalTickets,
      SUM(f.price) AS totalPrice,
      SUM(CASE WHEN t.ticketStatus = 'canceled' THEN 1 ELSE 0 END) AS cancelledTickets,
      SUM(CASE WHEN t.ticketStatus = 'canceled' THEN f.price ELSE 0 END) AS cancelledPrice
    FROM Tickets t
    JOIN Bookings b ON b.bookingID = t.bookingID
    JOIN Flights f ON f.flightID = t.flightID
    JOIN Payments p ON p.bookingID = b.bookingID
    WHERE b.bookingDate BETWEEN ? AND ?
    GROUP BY b.bookingDate
  `, [startDate, endDate]);


  const totalCancelledTickets = rows.reduce((sum, row) => sum + Number(row.cancelledTickets), 0);
  console.log(totalCancelledTickets)
  const report = rows.map(row => {
    const cancelRate = row.totalTickets > 0 
      ? (row.cancelledTickets / row.totalTickets) * 100 
      : 0;

    const percentOfTotalCancellations = totalCancelledTickets > 0
      ? (row.cancelledTickets / totalCancelledTickets) * 100
      : 0;

    return {
      date: row.bookingDate,
      totalTickets: row.totalTickets,
      cancelledTickets: row.cancelledTickets,
      cancelledPrice: row.cancelledPrice,
      totalPrice: row.totalPrice,
      cancelRate: cancelRate.toFixed(2) + '%',
      percentOfTotalCancellations: percentOfTotalCancellations.toFixed(2) + '%'
    };
  });

  return report;
};

//----------------------------------------//

exports.getAirlineRevenueReport = async (startDate, endDate) => {
  const [rows] = await db.query(`
    SELECT 
      a.airlineName AS airline,
      COUNT(f.flightID) AS totalFlights,
      SUM(f.price) AS revenue,
      AVG(
          (SELECT COUNT(*) 
          FROM Tickets t2 
          WHERE t2.flightID = f.flightID AND t2.ticketStatus = 'confirmed'
          ) / (f.availableSeats * 100)
      ) AS avgLoadFactor,
      SUM(CASE WHEN t.ticketStatus = 'canceled' THEN 1 ELSE 0 END) / COUNT(t.ticketID) * 100 AS cancelRate
    FROM Airlines a
    JOIN Flights f ON a.airlineID = f.airlineID
    JOIN Tickets t ON f.flightID = t.flightID
    JOIN Bookings b ON b.bookingID = t.bookingID
    WHERE b.bookingDate BETWEEN ? AND ?
    GROUP BY a.airlineID

  `, [startDate, endDate]);

  return rows;
};












//---------------------------------Reported------------------------------------------------//
