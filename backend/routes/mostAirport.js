const express = require('express');
const router = express.Router();




//Search หา
router.get('/popular-airport', async (req, res) => {
  const db = req.db;
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ message: 'กรุณาระบุวันที่เริ่มต้น (start) และสิ้นสุด (end)' });
  }

  try {
    const [rows] = await db.query(`
      SELECT 
        A.airportID,
        A.airportLabel,
        A.city,
        COUNT(*) AS totalFlights
      FROM (
        SELECT source AS airportID
        FROM Flights
        WHERE departTime BETWEEN ? AND ?

        UNION ALL

        SELECT destination AS airportID
        FROM Flights
        WHERE arrivalTime BETWEEN ? AND ?
      ) AS allFlights
      JOIN Airports A ON A.airportID = allFlights.airportID
      GROUP BY A.airportID
      ORDER BY totalFlights DESC
      LIMIT 1
    `, [start, end, start, end]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลเที่ยวบินในช่วงเวลาที่ระบุ' });
    }

    res.json({
      message: 'ค้นหาสนามบินยอดนิยมสำเร็จ',
      airport: rows[0]
    });
  } catch (err) {
    console.error('เกิดข้อผิดพลาด: ', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
  }
});

module.exports = router;
