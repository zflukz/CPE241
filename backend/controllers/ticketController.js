const ticketService = require('../services/ticketServices.js');

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketService.getAllTickets();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const { ticketID } = req.params;
    const ticket = await ticketService.getTicketById(ticketID);
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTicket = async (req, res) => {
  try {
    await ticketService.createTicket(req.body);
    res.json({ message: 'Ticket created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { ticketID } = req.params;
    await ticketService.updateTicket(ticketID, req.body);
    res.json({ message: 'Ticket updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const { ticketID } = req.params;
    await ticketService.deleteTicket(ticketID);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getBoardingPassByPassengerID = async (req, res) => {
    try {
      const passengerID = req.params.passengerID; // หรือ req.query.passengerID
      const ticket = await ticketService.getBoardingPassByPassengerID(passengerID);
      res.json(ticket);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

