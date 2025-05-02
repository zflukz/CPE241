const express = require('express')
const router = express.Router();
const airlineController = require('../controllers/airlineControlloer.js');

router.get('/search', airlineController.searchAirline);

module.exports = router;   