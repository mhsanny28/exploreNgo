const Package = require('../models/packageModel');

// Create a new package
exports.createPackage = async (req, res) => {
  try {
    const { hotel, taxi, photographer, price,images,packageName } = req.body;
    const newPackage = await Package.create({ hotel, taxi, photographer, price,images,packageName});
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const allPackages = await Package.find().populate('hotel taxi photographer');
    res.status(200).json(allPackages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific package by ID
exports.getPackageById = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id).populate('hotel taxi photographer');
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json(package);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a package by ID
exports.deletePackageById = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
