const flightService = require('../services/flightServices.js');

exports.createFlight = async (req, res) => {
  try {
    const flightCode = await flightService.createFlight(req.body);
    res.status(201).json({ flightCode });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFlights = async (req, res) => {
  try {
    const flights = await flightService.getAllFlights();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchByRoute = async (req, res) => {
  try {
    const { source, destination, departDate } = req.query;
    const flights = await flightService.findFlightsByRoute(source, destination, departDate);
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchRoundTrip = async (req, res) => {
  try {
    const { departDate, returnDate } = req.query;
    const flights = await flightService.findRoundTripFlights(departDate, returnDate);
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchByPrice = async (req, res) => {
  try {
    const { min, max } = req.query;
    const flights = await flightService.findFlightsByPrice(min, max);
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    await flightService.removeFlight(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.flightInformation = async (req, res) => {
  try {
    const flights = await flightService.flightInformation();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.flightInformationByID = async (req, res) => {
  try {
    const { flightID } = req.params; 
    const flights = await flightService.flightInformationByID(flightID);
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// exports.updateFlight = async (req, res) => {
//   const flightID = req.params.id;
//   const flightData = req.body;
//   try {
//     const result = await updateFlightService(flightID, flightData);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



exports.updateFlight = async (req, res) => {
  try {
    const { flightID } = req.params;
    const flightData = req.body;

    await flightService.updateFlight(flightID, flightData);
    res.status(200).json({ message: 'Flight updated successfully' });
  } catch (error) {
    console.error('Error updating flight:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
