const express = require('express')
const router = express.Router();
const airlineController = require('../controllers/airlineControlloer.js');

router.get('/search', airlineController.searchAirline);


  //---------------------------------- CRUD -------------------------------------------//

router.get('/', airlineController.getAll);
router.get('/:id', airlineController.getOne);
router.post('/create', airlineController.create);
router.put('/:id', airlineController.update);
router.delete('/:id', airlineController.remove);


  //---------------------------------- CRUD -------------------------------------------//

module.exports = router;   