const express = require('express');
const { createTaxi, deleteTaxiById, getTaxiById, getAllTaxis } = require('../controllers/taxiController');

const router = express.Router();

router.post('/taxi/create', createTaxi);


// find hotel by id and delete
router.delete('/taxi/:id', deleteTaxiById);

// find hotel by id
router.get('/taxi/:id', getTaxiById);

// find all hotels
router.get('/taxis', getAllTaxis);



module.exports = router;
