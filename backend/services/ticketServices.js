const ticketRepo = require('../repository/ticketRepositorys.js');

exports.getAllTickets = () => ticketRepo.getAllTickets();

exports.getTicketById = (ticketID) => ticketRepo.getTicketById(ticketID);

exports.createTicket = (ticketData) => ticketRepo.createTicket(ticketData);

exports.updateTicket = (ticketID, ticketData) => ticketRepo.updateTicket(ticketID, ticketData);

exports.deleteTicket = (ticketID) => ticketRepo.deleteTicket(ticketID);


exports.getBoardingPassByPassengerID = async (passengerID) => {
  const ticket = await ticketRepo.getBoardingPassByPassengerID(passengerID);

  if (!ticket) throw new Error('Ticket not found');

  return {
    flightNumber: ticket.flightNumber,
    from: {
      code: ticket.sourceCode,
      label: ticket.sourceAirport,
      time: ticket.departTime
    },
    to: {
      code: ticket.destinationCode,
      label: ticket.destinationAirport,
      time: ticket.arrivalTime
    },
    seat: ticket.seatNumber,
    date: new Date(ticket.bookingDate).toISOString().split('T')[0],
    passenger: {
      name: `${ticket.passengerFirstname} ${ticket.passengerLastname}`
    },
    checkinStatus: ticket.checkinStatus || "notChecked"
  };
};
