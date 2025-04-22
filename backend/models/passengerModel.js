const db = require('../config/db.js');

exports.createPassenger = async (userID, passengerData) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query('SET @currentUserID = ?', [userID]);

    const [result] = await conn.execute(`
      INSERT INTO Passengers (
        passengerFirstname, passengerLastname, sex, birthDate, nationality, phoneNumber
      ) VALUES (?, ?, ?, ?, ?, ?)
    `, [
      passengerData.passengerFirstname,
      passengerData.passengerLastname,
      passengerData.sex,
      passengerData.birthDate,
      passengerData.nationality,
      passengerData.phoneNumber
    ]);

    const passengerID = result.insertId;
    const formattedPassengerID = `P${passengerID.toString().padStart(3, '0')}`;

    await conn.commit();
    return { passengerID: formattedPassengerID };

  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};
