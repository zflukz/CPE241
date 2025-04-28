const airportModel = require("../models/airportModels");


exports.getAirports = async (req, res) => {
  try {
    const airports = await airportModel.getairport();
    res.status(200).json(airports);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error fetching airports' });
  }
};