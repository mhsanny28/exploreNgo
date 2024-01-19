const express = require('express');
const { createPhotographer, deletePhotographerById, getPhotographerById, getAllPhotographers } = require('../controllers/photographerController');

const router = express.Router();


router.post('/photo/create', createPhotographer);


// find hotel by id and delete
router.delete('/photo/:id', deletePhotographerById);

// find hotel by id
router.get('/photo/:id', getPhotographerById);

// find all hotels
router.get('/photos', getAllPhotographers);


module.exports = router;