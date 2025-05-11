const passengerService = require('../repository/passengerRepositorys.js');




// exports.createPassenger = async (req, res) => {
//   const { userID, ...passengerData } = req.body;

//   try {
//     const result = await passengerModel.createPassenger(userID, passengerData);
//     res.status(201).json({
//       message: 'Passenger created successfully',
//       passengerID: result.passengerID
//     });
//   } catch (err) {
//     console.error('Error creating passenger:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


exports.createPassenger = async (req, res) => {
  const db = req.db;
  const {
    userID,
    passengerFirstname,
    passengerLastname,
    sex,
    birthDate,
    nationality,
    phoneNumber,
    passportNumber
  } = req.body;

  try {
    // สร้าง passenger
    const [[{ count: passengerCount }]] = await db.query('SELECT COUNT(*) AS count FROM Passengers');
    const passengerID = `P${String(passengerCount + 1).padStart(3, '0')}`;

    
    await db.query(
      `INSERT INTO Passengers (passengerID, passengerFirstname, passengerLastname, sex, birthDate, nationality, phoneNumber, passportNumber)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [passengerID, passengerFirstname, passengerLastname, sex, birthDate, nationality, phoneNumber, passportNumber]
    );

    //สร้าง UserPassenger
    const [[{ count: upCount }]] = await db.query('SELECT COUNT(*) AS count FROM UserPassengers');
    const userPassengerID = `UP${String(upCount + 1).padStart(3, '0')}`;


    await db.query(
      `INSERT INTO UserPassengers (userPassengerID, userID, passengerID)
       VALUES (?, ?, ?)`,
      [userPassengerID, userID, passengerID]
    );

    res.status(201).json({
      message: 'สร้าง Passenger สำเร็จ',
      passengerID,
      userPassengerID
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// {
//   "userID": "U001",
//   "passengerFirstname": "Alice",
//   "passengerLastname": "Wonderland",
//   "sex": "female",
//   "birthDate": "1992-01-01",
//   "nationality": "USA",
//   "phoneNumber": "0891234567"
// }




exports.getAllPassengers = async (req, res) => {
  try {
    const passengers = await passengerService.getAllPassengers();
    res.json(passengers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPassengerById = async (req, res) => {
  try {
    const passenger = await passengerService.getPassengerById(req.params.id);
    if (!passenger) {
      return res.status(404).json({ message: 'Passenger not found' });
    }
    res.json(passenger);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePassenger = async (req, res) => {
  try {
    const result = await passengerService.updatePassenger(req.params.id, req.body);
    res.json({ message: 'Passenger updated', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePassenger = async (req, res) => {
  try {
    await passengerService.deletePassenger(req.params.id);
    res.json({ message: 'Passenger deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
