const db = require('../config/db.js');


exports.searchAirline = async (airlineName) => {
    const [rows] = await db.query(
      `SELECT * FROM Flights F
       JOIN Airlines AL ON F.airlineID = AL.airlineID
       WHERE AL.airlineName = ?`,
      [airlineName]
    );
    return rows;
  };

  
//---------------------------------- CRUD -------------------------------------------// 
  exports.getAll = async () => {
    const [rows] = await db.query('SELECT * FROM Airlines');
    return rows;
  };
  
  exports.getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM Airlines WHERE airlineID = ?', [id]);
    return rows[0];
  };
  
  exports.create = async ({ airlineID, airlineName }) => {
    await db.query('INSERT INTO Airlines (airlineID, airlineName) VALUES (?, ?)', [airlineID, airlineName]);
  };
  
  exports.update = async (id, airlineName) => {
    await db.query('UPDATE Airlines SET airlineName = ? WHERE airlineID = ?', [airlineName, id]);
  };
  
  exports.remove = async (id) => {
    await db.query('DELETE FROM Airlines WHERE airlineID = ?', [id]);
  };

  //---------------------------------- CRUD -------------------------------------------//