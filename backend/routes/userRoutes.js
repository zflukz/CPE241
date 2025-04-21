const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getUsers);
// สมัครสมาชิก
router.post('/register', userController.registerUser);
// เข้าสู่ระบบ
router.post('/login', userController.loginUser);

module.exports = router;


router.get('/', async (req, res) => {
    const db = req.db;
    try {
        const [results] = await db.query('SELECT * FROM Users');
        res.json(results); 
    } catch (err) {
        console.error(err);
        res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูล');
    }
});









  


  // รายชื่อผู้โดยสารของผู้ใช้ ใช้ ID ในการเช็ค
router.get('/:userID/passengers', async (req, res) => {
  const { userID } = req.params;
  const db = req.db;
  const [passengers] = await db.execute(`
    SELECT p.* FROM Passengers p
    JOIN UserPassengers up ON p.passengerID = up.passengerID
    WHERE up.userID = ?
  `, [userID]);

  res.json(passengers);
});

// ประวัติการจอง
router.get('/:userID/bookings', async (req, res) => {
  const { userID } = req.params;
  const db = req.db;
  const [bookings] = await db.execute(`
    SELECT b.*, f.label AS flightLabel, f.departTime, f.arrivalTime
    FROM Bookings b
    JOIN Flights f ON b.flightID = f.flightID
    WHERE b.userID = ?
    ORDER BY b.bookingDate DESC
  `, [userID]);

  res.json(bookings);
});
















module.exports = router;
