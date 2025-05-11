const bookingBaggageRepository = require('../repository/bookingBaggageRepositorys');

exports.getAllBookingBaggage = () => bookingBaggageRepository.getAll();

exports.getBookingBaggageById = (id) => bookingBaggageRepository.getById(id);

exports.createBookingBaggage = (data) => bookingBaggageRepository.create(data);

exports.updateBookingBaggage = (id, data) => bookingBaggageRepository.update(id, data);

exports.deleteBookingBaggage = (id) => bookingBaggageRepository.remove(id);
