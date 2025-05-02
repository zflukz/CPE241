
const airportService = require('../services/airportServices.js');

exports.getAirports = async (req, res) => {
  try {
    const airports = await airportService.getAirports();
    res.status(200).json(airports);
  } catch (error) {
    console.error('Error fetching airports:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
