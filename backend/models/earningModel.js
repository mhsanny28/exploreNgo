const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  balance: {
    type: Number,    
    default:0
  },
  
  // You can add other relevant attributes based on your requirements
  // For example, registration number, driver details, availability, etc.
}, { timestamps: true });

const EarningModel = mongoose.model('Earning', earningSchema);

module.exports = EarningModel;