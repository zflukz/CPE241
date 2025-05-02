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
