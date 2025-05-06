const db = require('../config/db.js');

exports.createFlight = async (flightData) => {
  const [result] = await db.execute(`
    INSERT INTO Flights 
    (label, source, destination, departTime, arrivalTime, availableSeats, price, seat, facilities, flightStatus)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    flightData.label,
    flightData.source,
    flightData.destination,
    flightData.departTime,
    flightData.arrivalTime,
    flightData.availableSeats,
    flightData.price,
    flightData.seat,
    flightData.facilities,
    flightData.flightStatus
  ]); 
  return result.insertId;
};

exports.getFlights = async () => {
  const [rows] = await db.execute(`SELECT * FROM Flights`);
  return rows;
};

exports.searchFlightsByRoute = async (source, destination, departDate) => {
  const [rows] = await db.execute(
    `SELECT * FROM Flights 
     WHERE source = ? AND destination = ? AND DATE(departTime) = ?`,
    [source, destination, departDate]
  );
  return rows;
};

exports.searchFlightsRoundTrip = async (departDate, returnDate) => {
  const [rows] = await db.execute(
    `SELECT * FROM Flights 
     WHERE DATE(departTime) = ? AND DATE(arrivalTime) = ?`,
    [departDate, returnDate]
  );
  return rows;
};

exports.searchByMoney = async (min, max) => {
  const [rows] = await db.execute(
    `SELECT * FROM Flights WHERE price BETWEEN ? AND ?`,
    [min, max]
  );
  return rows;
};

exports.deleteFlightByID = async (flightID) => {
  await db.execute(`DELETE FROM Flights WHERE flightID = ?`, [flightID]);
};


exports.flightInformation = async () => {
  const [rows] = await db.execute(`
    SELECT 
      f.flightID,
      src.code AS sourceCode,
      dest.code AS destinationCode,
      f.departTime,
      f.arrivalTime,
      src.airportLabel AS sourceAirport,
      dest.airportLabel AS destinationAirport,
      f.flightStatus,
      f.availableSeats AS totalSeats,
      COUNT(DISTINCT bp.bookingPassengerID) AS bookedSeats,
      f.availableSeats - COUNT(DISTINCT bp.bookingPassengerID) AS availableSeatsRemaining,
      
      GROUP_CONCAT(
        CONCAT(
          p.passengerID, '|',
          p.passengerFirstname, ' ', p.passengerLastname, '|',
          bp.seatNumber, '|',
          COALESCE(bag.status, 'notChecked')
        )
        SEPARATOR '||'
      ) AS passengerDetails

    FROM Flights f
    JOIN Airports src ON f.source = src.airportID
    JOIN Airports dest ON f.destination = dest.airportID
    LEFT JOIN Bookings b ON f.flightID = b.flightID AND b.bookingStatus = 'confirmed'
    LEFT JOIN BookingPassengers bp ON b.bookingID = bp.bookingID
    LEFT JOIN Passengers p ON bp.passengerID = p.passengerID
    LEFT JOIN Baggages bag 
      ON bag.passengerID = p.passengerID AND bag.flightID = f.flightID

    GROUP BY 
      f.flightID, src.code, dest.code, f.departTime, f.arrivalTime, 
      src.airportLabel, dest.airportLabel, f.flightStatus, f.availableSeats
  `);

  // Optional: แปลง passengerDetails เป็น Array of objects
  const result = rows.map(flight => {
    const passengers = (flight.passengerDetails || '')
      .split('||')
      .filter(Boolean)
      .map(item => {
        const [passengerID, fullName, seatNumber, checkInStatus] = item.split('|');
        return { passengerID, fullName, seatNumber, checkInStatus };
      });

    return {
      ...flight,
      passengers
    };
  });

  return result;
};




exports.flightInformationByID = async (flightID) => {
  const [rows] = await db.execute(`
    SELECT 
      f.flightID,
      src.code AS sourceCode,
      dest.code AS destinationCode,
      f.departTime,
      f.arrivalTime,
      src.airportLabel AS sourceAirport,
      dest.airportLabel AS destinationAirport,
      f.flightStatus,
      f.availableSeats AS totalSeats,
      COUNT(DISTINCT bp.bookingPassengerID) AS bookedSeats,
      f.availableSeats - COUNT(DISTINCT bp.bookingPassengerID) AS availableSeatsRemaining,
      
      GROUP_CONCAT(
        CONCAT(
          p.passengerID, '|',
          p.passengerFirstname, ' ', p.passengerLastname, '|',
          bp.seatNumber, '|',
          COALESCE(bag.status, 'notChecked')
        )
        SEPARATOR '||'
      ) AS passengerDetails

    FROM Flights f
    JOIN Airports src ON f.source = src.airportID
    JOIN Airports dest ON f.destination = dest.airportID
    LEFT JOIN Bookings b ON f.flightID = b.flightID AND b.bookingStatus = 'confirmed'
    LEFT JOIN BookingPassengers bp ON b.bookingID = bp.bookingID
    LEFT JOIN Passengers p ON bp.passengerID = p.passengerID
    LEFT JOIN Baggages bag 
      ON bag.passengerID = p.passengerID AND bag.flightID = f.flightID

    WHERE f.flightID = ?

    GROUP BY 
      f.flightID, src.code, dest.code, f.departTime, f.arrivalTime, 
      src.airportLabel, dest.airportLabel, f.flightStatus, f.availableSeats
  `, [flightID]);

  const result = rows.map(flight => {
    const passengers = (flight.passengerDetails || '')
      .split('||')
      .filter(Boolean)
      .map(item => {
        const [passengerID, fullName, seatNumber, checkInStatus] = item.split('|');
        return { passengerID, fullName, seatNumber, checkInStatus };
      });

    return {
      ...flight,
      passengers
    };
  });

  return result;
};


exports.updateFlight = async (flightID, data) => {
  const {
    label,
    source,             // airportID
    destination,        // airportID
    departTime,
    arrivalTime,
    availableSeats,
    price,
    seat,               
    flightStatus,       
    inflightServices,   
    gateID,
    terminalID,
    airportID,
    airlineID,
    carryOnWeight,             
    checkedBaggageWeight,     
    checkedBaggagePrice        
  } = data;

  //  Update Flight
  await db.execute(`
    UPDATE Flights SET
      label = ?,
      source = ?,
      destination = ?,
      departTime = ?,
      arrivalTime = ?,
      availableSeats = ?,
      price = ?,
      seat = ?,
      flightStatus = ?
    WHERE flightID = ?
  `, [
    label,
    source,
    destination,
    departTime,
    arrivalTime,
    availableSeats,
    price,
    seat,
    flightStatus,
    flightID
  ]);

  //  Update FlightFacilities
  // ดึงค่า flightFacilityID ล่าสุด
  const [rows] = await db.execute(`SELECT flightFacilityID FROM FlightFacilities ORDER BY flightFacilityID DESC LIMIT 1`);
  let lastID = rows.length > 0 ? rows[0].flightFacilityID : "FF000";

  // ดึงเลขท้าย +1
  let counter = parseInt(lastID.replace("FF", ""), 10);

  await db.execute(`DELETE FROM FlightFacilities WHERE flightID = ?`, [flightID]);

  for (const service of inflightServices) {
    counter++;
    const newID = "FF" + String(counter).padStart(3, "0"); // เช่น FF001, FF002

    await db.execute(
      `INSERT INTO FlightFacilities (flightFacilityID, flightID, facility) VALUES (?, ?, ?)`,
      [newID, flightID, service]
    );
  }
  //------------------------------------------------------------------------------------------------------------//

  // Update Airline ที่เชื่อม flight
  await db.execute(
    `UPDATE Airlines SET airlineID = ? WHERE flightID = ?`,
    [airlineID, flightID]
  );

  //  Update Gate -> Terminal -> Airport
  await db.execute(
    `UPDATE Gates SET terminalID = ? WHERE gateID = ?`,
    [terminalID, gateID]
  );

  await db.execute(
    `UPDATE Terminals SET airportID = ? WHERE terminalID = ?`,
    [airportID, terminalID]
  );

  //  Update BaggageOptions (carryOn & checked)
  await db.execute(`
    UPDATE BaggageOptions
    SET weight = ?
    WHERE airlineID = ? AND baggageOptionID = ?
  `, [carryOnWeight, airlineID, `${flightID}-carryOn`]);

  await db.execute(`
    UPDATE BaggageOptions
    SET weight = ?, price = ?
    WHERE airlineID = ? AND baggageOptionID = ?
  `, [checkedBaggageWeight, checkedBaggagePrice, airlineID, `${flightID}-checked`]);
};



