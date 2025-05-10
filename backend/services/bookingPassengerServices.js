const bookingPassengerRepo = require('../repository/bookingPassengerRepositorys.js');


exports.getLastBookingPassengerID = async () => {
  return await bookingPassengerbookingPassengerRepository.getLastBookingPassengerID();
};

exports.createBookingPassenger = async (bookingID, passengerID, seatNumber) => {
  const lastID = await bookingPassengerbookingPassengerRepository.getLastBookingPassengerID();
  const newID = lastID ? lastID + 1 : 1;
  await bookingPassengerbookingPassengerRepository.createBookingPassenger(newID, bookingID, passengerID, seatNumber);
  return newID;
};



exports.getAllBookingPassengers = () => bookingPassengerRepo.getAll();

exports.getBookingPassengerById = (id) => bookingPassengerRepo.getById(id);

exports.createBookingPassenger = (data) => bookingPassengerRepo.create(data);

exports.updateBookingPassenger = (id, data) => bookingPassengerRepo.update(id, data);

exports.deleteBookingPassenger = (id) => bookingPassengerRepo.remove(id);
