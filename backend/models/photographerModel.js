const mongoose = require('mongoose');

const photographerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cameraModel: {
    type: String,
    required: true
  },
  priceHourly: {
    type: Number,
    required: true
  },
  images: {
    type: Array,
},
  // You can add other relevant attributes based on your requirements
  // For example, specialization, availability, portfolio link, etc.
}, { timestamps: true });

const Photographer = mongoose.model('Photographer', photographerSchema);

module.exports = Photographer;
