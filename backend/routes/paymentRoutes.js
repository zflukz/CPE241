const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');


router.post('/', paymentController.createPayment);


//Routes รับ paymentID , newStatus
router.put('/:id/pay', paymentController.payPayment); 


module.exports = router;
