exports.createBooking = async (req, res) => {
    const db = req.db;
    const { userID, flightID, passengers } = req.body;
    const bookingDate = new Date();
  
    try {
      // 1. สร้าง Booking
      const query1 = `
        INSERT INTO Bookings (userID, flightID, bookingDate, bookingStatus)
        VALUES (?, ?, ?, 'CONFIRMED')
      `;
      await db.query(query1, [userID, flightID, bookingDate]);
  
      // ดึง bookingID ล่าสุด
      const [latest] = await db.query(`SELECT bookingID FROM Bookings ORDER BY bookingID DESC LIMIT 1`);
      const bookingID = latest[0].bookingID;
  
      // 2. ผูก passenger แต่ละคนกับ booking
      for (const p of passengers) {
        const { passengerID, seatNumber } = p;
        await db.query(
          `INSERT INTO BookingPassengers (bookingID, passengerID, seatNumber) VALUES (?, ?, ?)`,
          [bookingID, passengerID, seatNumber]
        );
      }
  
      res.status(201).json({
        message: 'จองเที่ยวบินสำเร็จ',
        bookingID: bookingID
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'เกิดข้อผิดพลาดในการจองเที่ยวบิน' });
    }
  };
  