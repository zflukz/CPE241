const flightRepo = require('../repository/flightRepositorys.js');

exports.createFlight = async (flightData) => {
  const insertId = await flightRepo.createFlight(flightData);
  return `F${insertId.toString().padStart(3, '0')}`;
};

exports.getAllFlights = async () => {
  return await flightRepo.getFlights();
};

exports.findFlightsByRoute = async (source, destination, departDate) => {
  return await flightRepo.searchFlightsByRoute(source, destination, departDate);
};

exports.findRoundTripFlights = async (departDate, returnDate) => {
  return await flightRepo.searchFlightsRoundTrip(departDate, returnDate);
};

exports.findFlightsByPrice = async (min, max) => {
  return await flightRepo.searchByMoney(min, max);
};

exports.removeFlight = async (flightID) => {
  return await flightRepo.deleteFlightByID(flightID);
};
