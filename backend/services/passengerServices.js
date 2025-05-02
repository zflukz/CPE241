const passengerRepo = require('../repository/passengerRepositorys.js');

exports.createPassenger = async (passenger) => {
  const lastID = await passengerRepo.getLastPassengerID();
  const newID = lastID ? lastID + 1 : 1;
  await passengerRepo.createPassenger(newID, passenger);
  return newID;
};
