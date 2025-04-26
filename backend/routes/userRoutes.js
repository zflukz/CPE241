const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getUsers);
// สมัครสมาชิก
router.post('/register', userController.registerUser);
// เข้าสู่ระบบ
router.post('/login', userController.loginUser);

router.delete('/:id' , userController.deleteUser);

router.put('/reset-password',userController.putNewPassword);



// GET passenger ทั้งหมด ของ user 
router.get('/:userID/passengers', userController.getPassengers);
// GET booking ทั้งหมดของ user
router.get('/:userID/bookings', userController.getBookings);

module.exports = router;
