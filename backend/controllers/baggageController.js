const baggageService = require('../services/baggageServices.js');

exports.getAll = async (req, res) => {
  try {
    const baggages = await baggageService.getAllBaggages();
    res.json(baggages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const baggage = await baggageService.getBaggageById(req.params.id);
    if (!baggage) return res.status(404).json({ message: 'Not found' });
    res.json(baggage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    await baggageService.createBaggage(req.body);
    res.status(201).json({ message: 'Created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await baggageService.updateBaggage(req.params.id, req.body);
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await baggageService.deleteBaggage(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
