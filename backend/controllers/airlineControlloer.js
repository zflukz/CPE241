
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



  //---------------------------------- CRUD -------------------------------------------//

exports.getAll = async (req, res) => {
  try {
    const airlines = await airlineService.getAllAirlines();
    res.json(airlines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const airline = await airlineService.getAirlineById(req.params.id);
    if (!airline) return res.status(404).json({ message: 'Not found' });
    res.json(airline);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    await airlineService.createAirline(req.body);
    res.status(201).json({ message: 'Created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await airlineService.updateAirline(req.params.id, req.body);
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await airlineService.deleteAirline(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  //---------------------------------- CRUD -------------------------------------------//