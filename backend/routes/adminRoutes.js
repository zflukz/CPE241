const express = require('express')
const router = express.Router();
const adminController = require("../controllers/adminController");


//หน้า dashboard
router.get('/dashboard', adminController.getDashboardStats);


//หน้า customerProfile
router.get('/:bookingID/profile', adminController.getCustomerProfile);


module.exports = router;