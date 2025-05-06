
const airlineService = require('../services/airlineServices.js');

exports.searchAirline = async (req, res) => {
  try {
    const airlineName = req.query.airlineName;
    const result = await airlineService.searchAirline(airlineName);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error searching airline:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
