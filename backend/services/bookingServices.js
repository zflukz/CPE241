const bookingRepo = require('../repository/bookingRepositorys');
const db = require('../config/db');
const passengerRepo = require('../repository/passengerRepositorys.js');
const bookingPassengerRepo = require('../repository/bookingPassengerRepositorys.js');

exports.getAllBookings = async () => {
  return await bookingRepo.getBooking();
};

exports.createBooking = async (userID, flightID, bookingDate, bookingStatus) => {
  const lastID = await bookingRepo.getLastBookingID();
  const newID = lastID ? lastID + 1 : 1;
  await bookingRepo.createBooking(newID, userID, flightID, bookingDate, bookingStatus);
  return newID;
};

exports.getBookingList = async () => {
  return await bookingRepo.bookingList();
};

exports.editBookingTransaction = async (data) => {
  return await bookingRepo.editBookingTransaction(db, data);
};




function generateNewID(lastID, prefix) {
  if (!lastID) return `${prefix}001`;
  const lastNumber = parseInt(lastID.replace(prefix, ''), 10);
  const newNumber = lastNumber + 1;
  return `${prefix}${newNumber.toString().padStart(3, '0')}`;
}

exports.createFullBooking = async (userID, flightID, bookingDate, bookingStatus, passengers) => {
  if (!passengers || passengers.length === 0 || passengers.length > 4) {
    throw new Error('Passengers must be between 1 and 4.');
  }

  const lastBookingID = await bookingRepo.getLastBookingID();
  const bookingID = generateNewID(lastBookingID, 'B');

  await bookingRepo.createBooking(bookingID, userID, flightID, bookingDate, bookingStatus);

  for (const passenger of passengers) {
    const lastPassengerID = await passengerRepo.getLastPassengerID();
    const passengerID = generateNewID(lastPassengerID, 'P');
    await passengerRepo.createPassenger(passengerID, passenger);

    const lastBookingPassengerID = await bookingPassengerRepo.getLastBookingPassengerID();
    const bookingPassengerID = generateNewID(lastBookingPassengerID, 'BP');

    const seatNumber = passenger.seatNumber || null;
    await bookingPassengerRepo.createBookingPassenger(bookingPassengerID, bookingID, passengerID, seatNumber);
  }

  return bookingID;
};
