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
  

