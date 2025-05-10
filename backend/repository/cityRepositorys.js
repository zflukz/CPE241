const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM Citys');
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Citys WHERE cityID = ?', [id]);
  return rows[0];
};

exports.create = async ({ cityID, cityName }) => {
  await db.query(
    'INSERT INTO Citys (cityID, cityName) VALUES (?, ?)',
    [cityID, cityName]
  );
};

exports.update = async (id, { cityName }) => {
  await db.query(
    'UPDATE Citys SET cityName = ? WHERE cityID = ?',
    [cityName, id]
  );
};

exports.remove = async (id) => {
  await db.query('DELETE FROM Citys WHERE cityID = ?', [id]);
};
