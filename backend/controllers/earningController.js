const EarningModel = require('../models/earningModel');

// Get balance
exports.getBalance = async (req, res) => {
  try {
    const earning = await EarningModel.findOne(); // Assuming you have only one document in the collection

    if (!earning) {
      return res.status(404).json({ error: 'Earning data not found' });
    }

    const { balance } = earning;
    res.status(200).json({ balance });
  } catch (error) {
    console.error('Error fetching balance:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.createEarning = async (req, res) => {
    try {
      const { balance } = req.body;
  
      const newEarning = await EarningModel.create({
        balance,
      });
  
      console.log('New Earning created:', newEarning);
      res.status(201).json({ message: 'Earning created successfully', earning: newEarning });
    } catch (error) {
      console.error('Error creating earning:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };