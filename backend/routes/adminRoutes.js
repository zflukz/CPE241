const express = require('express')
const router = express.Router();
const adminController = require("../controllers/adminController");


//หน้า dashboard 
router.get('/dashboard', adminController.getDashboardStats);

//Report
router.get('/flightRouteReport',adminController.getFlightPerformance);
router.get('/bookingSummaryReport',adminController.getbookingReport);
router.get('/cancelticketReport', adminController.getCanceledTicketReport);
router.get('/airlineRevenueReport', adminController.getAirlineRevenueReport);


//หน้า customerProfile
router.get('/:bookingID/profile', adminController.getCustomerProfile);

module.exports = router;