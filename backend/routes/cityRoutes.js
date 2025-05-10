const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.get('/', cityController.getAll);
router.get('/:id', cityController.getOne);
router.post('/', cityController.create);
router.put('/:id', cityController.update);
router.delete('/:id', cityController.remove);

module.exports = router;
