const airportRepository = require('../repository/airportRepositorys.js');

exports.getAirports = async () => {
  return await airportRepository.getAirports();
};



exports.getAllAirports = () => airportRepository.getAll();

exports.getAirportById = (id) => airportRepository.getById(id);

exports.createAirport = (data) => airportRepository.create(data);

exports.updateAirport = (id, data) => airportRepository.update(id, data);

exports.deleteAirport = (id) => airportRepository.remove(id);
