const TaxiModel = require('./../models/taxiModel');

// Create a new taxi
exports.createTaxi = async (req, res) => {
  try {
    const { carName, maxCapacity, pricePerKm,images,carType } = req.body;
    const newTaxi = await TaxiModel.create({ carName, maxCapacity, pricePerKm,images,carType});
    res.status(201).json(newTaxi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all taxis
exports.getAllTaxis = async (req, res) => {
  try {
    const allTaxis = await TaxiModel.find();
    res.status(200).json(allTaxis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific taxi by ID
exports.getTaxiById = async (req, res) => {
  try {
    const taxi = await TaxiModel.findById(req.params.id);
    if (!taxi) {
      return res.status(404).json({ message: 'Taxi not found' });
    }
    res.status(200).json(taxi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete a taxi by ID
exports.deleteTaxiById = async (req, res) => {
  try {
    const deletedTaxi = await TaxiModel.findByIdAndDelete(req.params.id);
    if (!deletedTaxi) {
      return res.status(404).json({ message: 'Taxi not found' });
    }
    res.status(200).json({ message: 'Taxi deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
