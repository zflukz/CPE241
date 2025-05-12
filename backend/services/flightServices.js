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

exports.flightInformation = async() =>{
  return await flightRepo.flightInformation();
};

exports.flightInformationByID = async(flightID) =>{
  return await flightRepo.flightInformationByID(flightID);
};

// exports.updateFlightService = async (flightID, updateData) => {
//   try {
//     await flightRepo.updateFlight(flightID, updateData);
//     return { success: true, message: "Flight updated successfully." };
//   } catch (error) {
//     console.error("Update flight error:", error);
//     throw new Error("Failed to update flight.");
//   }
// };


exports.updateFlight = async (flightID, flightData) => {
  return await flightRepo.updateFlight(flightID, flightData);
};