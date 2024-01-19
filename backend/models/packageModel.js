const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  taxi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Taxi',
    required: true
  },
  photographer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photographer',
    required: true
  },
  price: {
    type: Number,
    required: true
  }, 
   images: {
    type: Array,
},
packageName:{
  type:String
}
  // Add other relevant attributes as needed
  // For example, package name, description, duration, etc.
}, { timestamps: true });

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
