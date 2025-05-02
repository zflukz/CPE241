const express = require('express')
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get('/' , adminController.dashboard);
router.get('/flights',adminController.dashboardflight);
router.get('/topfive',adminController.top5airline);
router.get('/topthreeflight',adminController.top3flight);


module.exports = router;