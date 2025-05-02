const db = require('../config/db.js');

exports.getBooking = async () => {
  const [rows] = await db.query(`SELECT * FROM Bookings`);
  return rows;
};

exports.getLastBookingID = async () => {
  const [rows] = await db.execute('SELECT MAX(bookingID) as lastID FROM Bookings');
  return rows[0].lastID;
};

exports.createBooking = async (bookingID, userID, flightID, bookingDate, bookingStatus) => {
  await db.execute(
    'INSERT INTO Bookings (bookingID, userID, flightID, bookingDate, bookingStatus) VALUES (?, ?, ?, ?, ?)',
    [bookingID, userID, flightID, bookingDate, bookingStatus]
  );
};


exports.bookingList = async () => {
  const [rows] = await db.query(`
    SELECT 
      b.bookingID,
      b.bookingDate,
      b.flightID,
      COUNT(bp.passengerID) AS passengerCount,
      b.bookingStatus,
      GROUP_CONCAT(CONCAT(p.passengerFirstname, ' ', p.passengerLastname) SEPARATOR ', ') AS passengerNames
    FROM Bookings b
    JOIN BookingPassengers bp ON b.bookingID = bp.bookingID
    JOIN Passengers p ON bp.passengerID = p.passengerID
    GROUP BY b.bookingID, b.bookingDate, b.flightID, b.bookingStatus
  `);
  return rows;
};



exports.editBookingTransaction = async (data) => {
  try {
    await db.beginTransaction();

    // Edit Booking
    await db.query(
      `UPDATE Bookings SET bookingStatus = ? WHERE bookingID = ?`,
      [data.bookingStatus, data.bookingID]
    );

    // Edit Passenger
    for (const passenger of data.passengers) {
      await db.query(
        `UPDATE Passengers 
         SET passengerFirstname = ?, passengerLastname = ?, sex = ?, birthDate = ?, nationality = ?, phoneNumber = ?, passportNumber = ?
         WHERE passengerID = ?`,
        [
          passenger.passengerFirstname,
          passenger.passengerLastname,
          passenger.sex,
          passenger.birthDate,
          passenger.nationality,
          passenger.phoneNumber,
          passenger.passportNumber,
          passenger.passengerID,
        ]
      );
    }

    // Edit Payment
    await db.query(
      `UPDATE Payments SET amount = ?, paymentMethod = ?, paymentStatus = ? WHERE bookingID = ?`,
      [data.payment.amount, data.payment.paymentMethod, data.payment.paymentStatus, data.bookingID]
    );

    // Edit Flight (ถ้าแก้ flightID เดิม)
    if (data.flight) {
      await db.query(
        `UPDATE Flights 
         SET source = ?, destination = ?, departTime = ?, availableSeats = ?, airlineID = ?
         WHERE flightID = ?`,
        [
          data.flight.source,
          data.flight.destination,
          data.flight.departTime,
          data.flight.availableSeats,
          data.flight.airlineID,
          data.flight.flightID
        ]
      );
    }

    await db.commit();
    db.release();
    return { success: true };
  } catch (err) {
    await db.rollback();
    db.release();
    throw err;
  }
};

