const airlineRepository = require('../repository/airlineRepositorys.js');

exports.searchAirline = async (airlineName) => {
  const results = await airlineRepository.searchAirline(airlineName);
  return results;
};

  //---------------------------------- CRUD -------------------------------------------//
exports.getAllAirlines = () => airlineRepository.getAll();

exports.getAirlineById = (id) => airlineRepository.getById(id);

exports.createAirline = (data) => airlineRepository.create(data);

exports.updateAirline = (id, data) => airlineRepository.update(id, data.airlineName);

exports.deleteAirline = (id) => airlineRepository.remove(id);
  //---------------------------------- CRUD -------------------------------------------//