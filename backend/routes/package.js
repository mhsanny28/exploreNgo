const express = require('express');
const { createPackage, deletePackageById, getPackageById, getAllPackages } = require('../controllers/packageController');

const router = express.Router();

router.post('/pack/create', createPackage);


// find hotel by id and delete
router.delete('/pack/:id', deletePackageById);

// find hotel by id
router.get('/pack/:id', getPackageById);

// find all hotels
router.get('/packs', getAllPackages);

module.exports = router;