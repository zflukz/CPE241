const airportRepository = require('../repository/airportRepositorys.js');

exports.getAirports = async () => {
  return await airportRepository.getAirports();
};
