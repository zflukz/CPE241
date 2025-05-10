const express = require('express');
const router = express.Router();
const airportController = require('../controllers/airportController.js');



//getAiportAll airport
router.get('/' , airportController.getAirports);

router.get('/all', airportController.getAll);
router.get('/:id', airportController.getOne);
router.post('/', airportController.create);
router.put('/:id', airportController.update);
router.delete('/:id', airportController.remove);



module.exports = router;

