const db = require('../config/db.js')


exports.getAllTickets = async () => {
  const [rows] = await db.execute(`SELECT * FROM Tickets`);
  return rows;
};

exports.getTicketById = async (ticketID) => {
  const [rows] = await db.execute(`SELECT * FROM Tickets WHERE ticketID = ?`, [ticketID]);
  return rows[0];
};

exports.createTicket = async (ticketData) => {
  const { ticketID, bookingID, passengerID, flightID, ticketStatus } = ticketData;
  await db.execute(
    `INSERT INTO Tickets (ticketID, bookingID, passengerID, flightID, ticketStatus)
     VALUES (?, ?, ?, ?, ?)`,
    [ticketID, bookingID, passengerID, flightID, ticketStatus]
  );
};

exports.updateTicket = async (ticketID, ticketData) => {
  const { bookingID, passengerID, flightID, ticketStatus } = ticketData;
  await db.execute(
    `UPDATE Tickets
     SET bookingID = ?, passengerID = ?, flightID = ?, ticketStatus = ?
     WHERE ticketID = ?`,
    [bookingID, passengerID, flightID, ticketStatus, ticketID]
  );
};

exports.deleteTicket = async (ticketID) => {
  await db.execute(`DELETE FROM Tickets WHERE ticketID = ?`, [ticketID]);
};




exports.getBoardingPassByPassengerID = async (passengerID) => {
  const [rows] = await db.execute(`
    SELECT 
      f.flightID,
      f.flightNumber,
      f.departTime,
      f.arrivalTime,
      f.flightStatus,
      src.code AS sourceCode,
      src.airportLabel AS sourceAirport,
      dest.code AS destinationCode,
      dest.airportLabel AS destinationAirport,
      bp.seatNumber,
      p.passengerFirstname,
      p.passengerLastname,
      b.bookingDate,
      bag.status AS checkinStatus
    FROM BookingPassengers bp
    JOIN Bookings b ON bp.bookingID = b.bookingID
    JOIN Flights f ON b.flightID = f.flightID
    JOIN Passengers p ON bp.passengerID = p.passengerID
    JOIN Airports src ON f.source = src.airportID
    JOIN Airports dest ON f.destination = dest.airportID
    LEFT JOIN Baggages bag ON bag.passengerID = p.passengerID AND bag.flightID = f.flightID
    WHERE bp.passengerID = ?
  `, [passengerID]);

  return rows[0];
};
