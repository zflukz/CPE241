const express = require('express')
const router = express.Router();
const airlineController = require('../controllers/airlineControlloer.js');




//search airline จาก airlineName
router.get('/search', airlineController.searchAirline);

module.exports = router;   