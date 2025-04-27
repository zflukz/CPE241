const express = require('express');
const router = express.Router();

//Get All
router.get('/', async (req, res) => {
    const db = req.db;
    try {
        const [results] = await db.query('SELECT * FROM Passengers');
        res.json(results); 
    } catch (err) {
        console.error(err);
        res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูล');
    }
});


//Get by passengerFirstName
router.get('/id', async (req, res) => {
    const db = req.db;
    const { passengerFirstname } = req.query; 
  
    try {
      const query = 'SELECT * FROM Passengers WHERE passengerFirstname = ?';
      const [results] = await db.query(query, [passengerFirstname]); 
  
      res.status(200).json({
        message: 'เเสดงข้อมูล',
        passengers: results
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('เกิดข้อผิดพลาดในการแสดงข้อมูล');
    }
  });






router.post('/Register', async (req, res) => {
    const db = req.db; 
    const { passengerFirstname, passengerLastname, sex, birthDate , nationality, phoneNumber } = req.body;
    
    try {
      // SQL query เพื่อเพิ่มข้อมูลลงใน Passengers
      const query = 'INSERT INTO Passengers (passengerFirstname, passengerLastname, sex, birthDate , nationality, phoneNumber) VALUES (?, ?, ?, ?, ?, ?)';
      const [results] = await db.query(query, [passengerFirstname, passengerLastname, sex, birthDate , nationality, phoneNumber]);
  
      res.status(201).json({ message: 'User created successfully', userID: results.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).send('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
    }
  });










module.exports = router;