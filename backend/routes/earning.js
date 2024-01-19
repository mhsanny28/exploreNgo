const express = require('express');
const router = express.Router();
const earningController = require('../controllers/earningController');

// Get balance
router.get('/earning/balance', earningController.getBalance);
router.post('/earning/create',earningController.createEarning)

module.exports = router;
