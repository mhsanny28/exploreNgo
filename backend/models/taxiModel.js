const mongoose = require('mongoose');

const taxiSchema = new mongoose.Schema({
  carName: {
    type: String,
    required: true
  },
  maxCapacity: {
    type: Number,
    required: true
  },
  pricePerKm: {
    type: Number,
    required: true
  },
  images: {
    type: Array,
},
carType:{
  type: String,
  required: true
}
  // You can add other relevant attributes based on your requirements
  // For example, registration number, driver details, availability, etc.
}, { timestamps: true });

const TaxiModel = mongoose.model('Taxi', taxiSchema);

module.exports = TaxiModel;