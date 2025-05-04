const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/', ticketController.getAllTickets);
// router.get('/:ticketID', ticketController.getTicketById);
// router.post('/', ticketController.createTicket);
// router.put('/:ticketID', ticketController.updateTicket);
// router.delete('/:ticketID', ticketController.deleteTicket);
router.get('/:passengerID',ticketController.getBoardingPassByPassengerID);
module.exports = router;
