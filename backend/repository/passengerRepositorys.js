const db = require('../config/db.js');

exports.getLastPassengerID = async () => {
  const [rows] = await db.execute('SELECT MAX(passengerID) as lastID FROM Passengers');
  return rows[0].lastID;
};

exports.createPassenger = async (passengerID, passenger) => {
  await db.execute(
    `INSERT INTO Passengers 
      (passengerID, passengerFirstname, passengerLastname, sex, birthDate, nationality, phoneNumber, passportNumber) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      passengerID,
      passenger.passengerFirstname,
      passenger.passengerLastname,
      passenger.sex,
      passenger.birthDate,
      passenger.nationality,
      passenger.phoneNumber,
      passenger.passportNumber
    ]
  );
};






exports.getAllPassengers = async () => {
  const [rows] = await db.execute('SELECT * FROM Passengers');
  return rows;
};

exports.getPassengerById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM Passengers WHERE passengerID = ?', [id]);
  return rows[0];
};

exports.updatePassenger = async (id, passenger) => {
  const sql = `
    UPDATE Passengers SET 
    passengerFirstname = ?, passengerLastname = ?, sex = ?, birthDate = ?, 
    nationality = ?, phoneNumber = ?, passportNumber = ?
    WHERE passengerID = ?
  `;
  const [result] = await db.execute(sql, [
    passenger.passengerFirstname,
    passenger.passengerLastname,
    passenger.sex,
    passenger.birthDate,
    passenger.nationality,
    passenger.phoneNumber,
    passenger.passportNumber,
    id
  ]);
  return result;
};

exports.deletePassenger = async (id) => {
  const [result] = await db.execute('DELETE FROM Passengers WHERE passengerID = ?', [id]);
  return result;
};