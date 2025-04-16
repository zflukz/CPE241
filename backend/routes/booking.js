const express = require('express');
const router = express.Router();




// 📦 1.3 สร้าง Booking (ไม่ใช้ UUID)
router.post('/', async (req, res) => {
  const { userID, flightID, passengers } = req.body;
  const db = req.db;
  // สร้าง Booking
  const [bookingResult] = await db.execute(`
    INSERT INTO Bookings (userID, flightID, bookingDate, bookingStatus)
    VALUES (?, ?, NOW(), 'pending')
  `, [userID, flightID]);

  const bookingID = bookingResult.insertId;

  // สร้าง BookingPassengers
  for (const p of passengers) {
    await db.execute(`
      INSERT INTO BookingPassengers (bookingID, passengerID, seatNumber)
      VALUES (?, ?, ?)
    `, [bookingID, p.passengerID, p.seatNumber]);
  }

  res.json({ bookingID, message: 'Booking created successfully' });
});

// 🧾 สรุปก่อนชำระเงิน
router.get('/summary/:bookingID', async (req, res) => {
  const { bookingID } = req.params;
  const db = req.db;
  const [summary] = await db.execute(`
    SELECT b.*, f.label AS flightLabel, f.price, COUNT(bp.passengerID) AS totalPassengers
    FROM Bookings b
    JOIN Flights f ON b.flightID = f.flightID
    JOIN BookingPassengers bp ON bp.bookingID = b.bookingID
    WHERE b.bookingID = ?
    GROUP BY b.bookingID
  `, [bookingID]);

  res.json(summary[0]);
});



router.get('/', async (req, res) => {
  const db = req.db;
  try {
      const [results] = await db.query('SELECT * FROM Bookings  SELECT * FROM BookingPassengers');
      res.json(results); 
  } catch (err) {
      console.error(err);
      res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูล');
  }
});


router.get('/details/:bookingID', async (req, res) => {
  const db = req.db;
  const { bookingID } = req.params;

  const [details] = await db.execute(`
    SELECT 
      b.bookingID,
      b.userID,
      b.flightID,
      b.bookingDate,
      b.bookingStatus,
      bp.bookingPassengerID,
      bp.passengerID,
      bp.seatNumber
    FROM Bookings b
    JOIN BookingPassengers bp ON b.bookingID = bp.bookingID
    WHERE b.bookingID = ?
  `, [bookingID]);

  res.json(details); // ได้ array ผู้โดยสารที่อยู่ใน booking นั้น
});

module.exports = router;
