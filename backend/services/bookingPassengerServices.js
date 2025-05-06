const bookingPassengerRepository = require('../repository/bookingPassengerRepositorys.js');

exports.getLastBookingPassengerID = async () => {
  return await bookingPassengerRepository.getLastBookingPassengerID();
};

exports.createBookingPassenger = async (bookingID, passengerID, seatNumber) => {
  const lastID = await bookingPassengerRepository.getLastBookingPassengerID();
  const newID = lastID ? lastID + 1 : 1;
  await bookingPassengerRepository.createBookingPassenger(newID, bookingID, passengerID, seatNumber);
  return newID;
};
