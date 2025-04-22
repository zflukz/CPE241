const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'chickenAirlines',
  port:3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
//chickenAirlines

(async () => {
    try {
      const connection = await pool.getConnection();
      console.log('เชื่อมต่อ MySQL สำเร็จ!');
      connection.release(); 
    } catch (err) {
      console.error('เชื่อมต่อฐานข้อมูลล้มเหลว: ', err);
    }
})();

module.exports = pool;