const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

router.post('/', flightController.createFlight);
router.get('/', flightController.getFlights);

module.exports = router;


//search source to destination with AirportID
router.get('/search', async (req, res) => {
  const db = req.db;
  const { source, destination } = req.query;

  if (!source || !destination) {
     return res.status(400).json({ message: 'กรุณาระบุชื่อเมืองต้นทางและปลายทาง (source, destination)' });
   }

  try {
    const [rows] = await db.query(
      `
      SELECT * FROM Flights F
      JOIN Airports AS A ON F.source = A.airportID
      WHERE F.source = ? AND F.destination = ?
      `,
      [source,destination]
    );
    

    if (rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบเที่ยวบินในเส้นทางนี้' });
    }

    res.json({
      message: 'ค้นหาเที่ยวบินสำเร็จ',
      flights: rows,
    });

  } catch (err) {
    console.error('เกิดข้อผิดพลาด: ', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
  }
});


//check คนที่อยู่เที่ยวบินนี้
router.get('/:flightID/passengers', async (req, res) => {
  const db = req.db;
  const { flightID } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT 
        T.ticketID,
        T.flightID,
        T.ticketStatus,
        P.passengerID,
        P.passengerFirstname,
        P.passengerLastname,
        P.sex,
        P.birthDate,
        P.nationality,
        P.phoneNumber,
        BP.seatNumber,
        B.bookingDate,
        B.bookingStatus,
        Pay.paymentStatus,
        Pay.paymentMethod,
        Pay.amount
      FROM Tickets T
      JOIN Passengers P ON T.passengerID = P.passengerID
      JOIN Bookings B ON T.bookingID = B.bookingID
      JOIN BookingPassengers BP ON BP.bookingID = B.bookingID AND BP.passengerID = P.passengerID
      LEFT JOIN Payments Pay ON B.bookingID = Pay.bookingID
      WHERE T.flightID = ?
      `,
      [flightID]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบผู้โดยสารในเที่ยวบินนี้' });
    }

    res.json({
      message: 'แสดงผู้โดยสารในเที่ยวบินสำเร็จ',
      passengers: rows
    });
  } catch (err) {
    console.error('เกิดข้อผิดพลาด: ', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
  }
});

module.exports = router;














module.exports = router;
