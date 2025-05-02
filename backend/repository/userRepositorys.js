const db = require('../config/db');

exports.insertUser = async (userData) => {
  const [result] = await db.execute(`
    INSERT INTO Users (username, password, email, role)
    VALUES (?, ?, ?, ?)`,
    [userData.username, userData.password, userData.email, userData.role]
  );
  return result.insertId;
};

exports.getAllUsers = async () => {
  const [rows] = await db.execute(`SELECT * FROM Users`);
  return rows;
};

exports.findUserByEmailAndPassword = async (email, password) => {
  const [rows] = await db.execute(`
    SELECT * FROM Users WHERE email = ? AND password = ?`,
    [email, password]
  );
  return rows.length > 0 ? rows[0] : null;
};

exports.deleteUser = async (userID) => {
  const [result] = await db.execute(`DELETE FROM Users WHERE userID = ?`, [userID]);
  return result.affectedRows > 0;
};

exports.resetPassword = async (email, newPassword) => {
  const [result] = await db.execute(
    `UPDATE Users SET password = ? WHERE email = ?`,
    [newPassword, email]
  );
  return result.affectedRows > 0;
};

exports.getPassengerByUserID = async (userID) => {
  const [rows] = await db.execute(`
    SELECT p.* FROM Passengers p
    JOIN UserPassengers up ON p.passengerID = up.passengerID
    WHERE up.userID = ?`, [userID]);
  return rows;
};

exports.getBookingByUserID = async (userID) => {
  const [rows] = await db.execute(`
    SELECT b.*, f.label AS flightLabel, f.departTime, f.arrivalTime 
    FROM Bookings b
    JOIN Flights f ON b.flightID = f.flightID
    WHERE b.userID = ?
    ORDER BY b.bookingDate DESC`, [userID]);
  return rows;
};

exports.updateUser = async (userID, username, password, email, role) => {
  const [result] = await db.execute(`
    UPDATE Users 
    SET username = ?, password = ?, email = ?, role = ?
    WHERE userID = ?`,
    [username, password, email, role, userID]
  );
  return result.affectedRows > 0;
};



exports.getUserList = async () => {
  const [rows] = await db.execute(`SELECT userID, username, email, role FROM Users`);
  return rows;
};
