const express = require('express')
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get('/dashboard', adminController.getDashboardStats);
router.get('/flightRouteReport',adminController.getFlightPerformance);
router.get('/bookingSummaryReport',adminController.getbookingReport);

module.exports = router;