const express = require('express');
const router = express.Router();



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


//Register ข้อมูล
//localhost:8000/user/register
router.post('/register', async (req, res) => {
    const db = req.db; 
    const { username, password, email, role } = req.body;
    
    try {
      // ตรวจสอบว่า role เป็น undefined หรือไม่ ถ้าเป็นให้ใช้ 'person' เป็นค่า default
      const userRole = role || 'person';
  
      // SQL query เพื่อเพิ่มข้อมูลลงใน Users
      const query = 'INSERT INTO Users (username, password, email, role) VALUES (?, ?, ?, ?)';
      const [results] = await db.query(query, [username, password, email, userRole]);
  
      res.status(201).json({ message: 'User created successfully', userID: results.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).send('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
    }
  });


//localhost:8000/user/login
router.post('/login', async (req, res) => {
    const db = req.db;
    const { username, password } = req.body;
  
    try {
      const [rows] = await db.query(
        'SELECT * FROM Users WHERE username = ? AND password = ?',
        [username, password]
      );
  
      if (rows.length === 0) {
        return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
      }
  
      const user = rows[0];
      res.json({
        message: 'เข้าสู่ระบบสำเร็จ',
        user: {
          userID: user.userID, 
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
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
