const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passengerController');

// POST /api/passengers
router.post('/create', passengerController.createPassenger);
router.get('/', passengerController.getAllPassengers);
router.get('/:id', passengerController.getPassengerById);
router.put('/:id', passengerController.updatePassenger);
router.delete('/:id', passengerController.deletePassenger);
module.exports = router;
