const express = require('express');
const router = express.Router();
const baggageController = require('../controllers/baggageController');

router.get('/', baggageController.getAll);
router.get('/:id', baggageController.getOne);
router.post('/', baggageController.create);
router.put('/:id', baggageController.update);
router.delete('/:id', baggageController.remove);

module.exports = router;
