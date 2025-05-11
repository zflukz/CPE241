const passengerRepo = require('../repository/passengerRepositorys.js');

exports.createPassenger = async (passenger) => {
  const lastID = await passengerRepo.getLastPassengerID();
  const newID = lastID ? lastID + 1 : 1;
  await passengerRepo.createPassenger(newID, passenger);
  return newID;
};



exports.getAllPassengers = () => {
  return passengerRepo.getAllPassengers();
};

exports.getPassengerById = (id) => {
  return passengerRepo.getPassengerById(id);
};

exports.updatePassenger = (id, data) => {
  return passengerRepo.updatePassenger(id, data);
};

exports.deletePassenger = (id) => {
  return passengerRepo.deletePassenger(id);
};