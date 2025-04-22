const db = require('../config/db.js')



exports.createUser = async (userData) => {
  const [result] = await db.execute(`
    INSERT INTO Users (username, password, email, role)
    VALUES (?, ?, ?, ?)
  `, [userData.username, userData.password, userData.email, userData.role]);

  const userID = result.insertId;
  return `U${userID.toString().padStart(3, '0')}`;
};

exports.getUsers = async () => {
  const [rows] = await db.execute(`SELECT * FROM Users`);
  return rows;
};


exports.insertUser = async (db, userData) => {
    const query = `
      INSERT INTO Users (username, password, email, role)
      VALUES (?, ?, ?, ?)
    `;
    const [results] = await db.query(query, [
      userData.username,
      userData.password,
      userData.email,
      userData.role,
    ]);
  
    return results.insertId;
  };
  
exports.getUserByUsernameAndPassword = async (db, username, password) => {
  const query = `
    SELECT * FROM Users
    WHERE username = ? AND password = ?
  `;
  const [rows] = await db.query(query, [username, password]);

  return rows.length > 0 ? rows[0] : null;
};
  

exports.deleteUserByID = async (userID, callback) =>{
  const query = 'DELETE FROM Users WHERE userID = ?';
  db.query(query, [userID], callback);
};



exports.getPassengerByUserID = async (db , userID)=>{
  const [rows] = await db.execute(
    `SELECT p.* FROM Passenger p
    JOIN UserPassengers up ON p.passengerID = up.passengerID
    WHERE up.userID = ?`,[userID]);
    return rows;
};

exports.getBookingByUserID = async (db, userID)=>{
  const [rows] = await db.execute(
    `SELECT b.* , f.label AS flightLabel, f.departTime, f.arrivalTime FROM Booking b
    JOIN Flights f ON b.flightID = f.flightID
    WHERE b.userID = ?
    ORDER BY b.bookingDate DESC`,[userID]);
    return rows;
  }