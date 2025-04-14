const express = require('express');
const router = express.Router();

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

module.exports = router;
