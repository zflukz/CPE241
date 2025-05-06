const airlineRepository = require('../repository/airlineRepositorys.js');

exports.searchAirline = async (airlineName) => {
  const results = await airlineRepository.searchAirline(airlineName);
  return results;
};
