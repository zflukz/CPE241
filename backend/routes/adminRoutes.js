const express = require('express')
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get('/' , adminController.dashboard);
router.get('/flights',adminController.dashboardflight);



module.exports = router;