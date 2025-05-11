
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



exports.getAll = async (req, res) => {
  try {
    const airports = await airportService.getAllAirports();
    res.json(airports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const airport = await airportService.getAirportById(req.params.id);
    if (!airport) return res.status(404).json({ message: 'Not found' });
    res.json(airport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    await airportService.createAirport(req.body);
    res.status(201).json({ message: 'Created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await airportService.updateAirport(req.params.id, req.body);
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await airportService.deleteAirport(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};