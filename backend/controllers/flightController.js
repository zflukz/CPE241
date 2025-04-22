const flightModel = require('../models/flightModels.js');

exports.createFlight = async (req, res) => {
  try {
    const flightID = await flightModel.createFlight(req.body);
    res.status(201).json({ message: 'Flight created', flightID });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Error creating flight' });
  }
};

exports.getFlights = async (req, res) => {
  try {
    const flights = await flightModel.getFlights();
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching flights' });
  }
};
