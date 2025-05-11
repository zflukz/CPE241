const cityService = require('../services/cityServices');

exports.getAll = async (req, res) => {
  try {
    const cities = await cityService.getAllCities();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const city = await cityService.getCityById(req.params.id);
    if (!city) return res.status(404).json({ message: 'Not found' });
    res.json(city);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    await cityService.createCity(req.body);
    res.status(201).json({ message: 'Created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await cityService.updateCity(req.params.id, req.body);
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await cityService.deleteCity(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
