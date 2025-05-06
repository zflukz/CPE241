// require('dotenv').config(); // โหลดค่าจาก .env ก่อนใช้งาน

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// const pool = mysql.createPool({
//   host: "mysql.sssboom.xyz",
//   user: "dev",
//   password: "7815696ecbf1c96e6894b779456d330e",
//   database: "chickenAirlines" ,
//   port: 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('connected');
    connection.release(); 
  } catch (err) {
    console.error('connect failed: ', err);
  }
})();

module.exports = pool;
