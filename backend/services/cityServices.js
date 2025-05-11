const cityRepo = require('../repository/cityRepositorys');

exports.getAllCities = () => cityRepo.getAll();

exports.getCityById = (id) => cityRepo.getById(id);

exports.createCity = (data) => cityRepo.create(data);

exports.updateCity = (id, data) => cityRepo.update(id, data);

exports.deleteCity = (id) => cityRepo.remove(id);
