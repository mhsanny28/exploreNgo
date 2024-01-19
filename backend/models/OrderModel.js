const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  startDate: {
    type: Date,
    
  },
  endDate: {
    type: Date,
   
  },
  totalPrice: {
    type: Number,
    required: true
  },
  payment: {
    type: String,
    default: 'due'
  },
  orderStatus: {
    type: String,
    default: 'pending'
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
