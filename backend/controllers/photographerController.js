const PhotographerModel = require('../models/photographerModel');

// Create a new photographer
exports.createPhotographer = async (req, res) => {
  try {
    const { name, cameraModel, priceHourly,images } = req.body;
    const newPhotographer = await PhotographerModel.create({ name, cameraModel, priceHourly ,images});
    res.status(201).json(newPhotographer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all photographers
exports.getAllPhotographers = async (req, res) => {
  try {
    const allPhotographers = await PhotographerModel.find();
    res.status(200).json(allPhotographers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific photographer by ID
exports.getPhotographerById = async (req, res) => {
  try {
    const photographer = await PhotographerModel.findById(req.params.id);
    if (!photographer) {
      return res.status(404).json({ message: 'Photographer not found' });
    }
    res.status(200).json(photographer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a photographer by ID
exports.deletePhotographerById = async (req, res) => {
  try {
    const deletedPhotographer = await PhotographerModel.findByIdAndDelete(req.params.id);
    if (!deletedPhotographer) {
      return res.status(404).json({ message: 'Photographer not found' });
    }
    res.status(200).json({ message: 'Photographer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
