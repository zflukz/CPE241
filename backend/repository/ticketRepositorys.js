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
        src.code AS sourceCode,
        src.airportLabel AS sourceAirport,
        dest.code AS destinationCode,
        dest.airportLabel AS destinationAirport,
        f.departTime,
        f.arrivalTime,
        bp.seatNumber,
        b.bookingDate,
        p.passengerFirstname,
        p.passengerLastname,
        COALESCE(bag.status, 'notChecked') AS checkinStatus
  
      FROM BookingPassengers bp
      JOIN Bookings b ON bp.bookingID = b.bookingID AND b.bookingStatus = 'confirmed'
      JOIN Flights f ON b.flightID = f.flightID
      JOIN Airports src ON f.source = src.airportID
      JOIN Airports dest ON f.destination = dest.airportID
      JOIN Passengers p ON bp.passengerID = p.passengerID
      LEFT JOIN Baggages bag ON bag.passengerID = p.passengerID AND bag.flightID = f.flightID
  
      WHERE bp.passengerID = ?
      LIMIT 1
    `, [passengerID]);
    //console.log("ROWS: " ,rows);
  
    return rows[0]; 
  };
  