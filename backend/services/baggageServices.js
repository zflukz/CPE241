const baggageRepository = require('../repository/baggageRepositorys.js');

exports.getAllBaggages = () => baggageRepository.getAll();

exports.getBaggageById = (id) => baggageRepository.getById(id);

exports.createBaggage = (data) => baggageRepository.create(data);

exports.updateBaggage = (id, data) => baggageRepository.update(id, data);

exports.deleteBaggage = (id) => baggageRepository.remove(id);
