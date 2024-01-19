const Order = require('../models/OrderModel');
const { getOneHotel } = require('./hotelController');
const {getPackageById} = require('./packageController')
const {getTaxiById} = require('./taxiController')
const {getPhotographerById} = require('./photographerController')
const earningController = require('./earningController');
const EarningModel = require('../models/earningModel');



// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      user,
      serviceType,
      serviceId,
      startDate,
      endDate,
      totalPrice,
      payment = 'due', 
      orderStatus = 'pending'
    } = req.body;

    const newOrder = await Order.create({
      user,
      serviceType,
      serviceId,
      startDate,
      endDate,
      totalPrice,
      payment,
      orderStatus,
    });

    console.log('New Order created:', newOrder);
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};


// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate('user', 'fullname');
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching all orders:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

  // Update payment status from due to paid
exports.updatePaymentStatus = async (req, res) => {
    const orderId = req.body.id;
    const price = req.body.price;
    try {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { payment: 'paid' }, { new: true });
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      const currentBalance = await EarningModel.findOne();

      if (!currentBalance) {
        return res.status(404).json({ error: 'Earning data not found' });
      }

      console.log("price", price);
      console.log("current balance",currentBalance.balance);

          // Calculate the new balance
    const newBalance = currentBalance.balance + price;

    // Update the balance in the earning model
    await EarningModel.updateOne({}, { balance: newBalance });


     res.status(200).json({ message: 'Payment status updated to paid', order: updatedOrder });
     
    } catch (error) {
      console.error('Error updating payment status:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };

  // Update order status from pending to approved
exports.updateOrderStatus = async (req, res) => {
    const orderId = req.body.id;
    console.log('order id', orderId);
    try {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { orderStatus: 'approved' }, { new: true });
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json({ message: 'Order status updated to approved', order: updatedOrder });
    } catch (error) {
      console.error('Error updating order status:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

  // Get orders by user ID
exports.getOrdersByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
      const orders = await Order.find({ user: userId });
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders by user ID:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Delete order by ID
exports.deleteOrderById = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
  } catch (error) {
    console.error('Error deleting order:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};


// Get order details by ID
exports.getOrderDetailsById = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const orderDetails = await Order.findById(orderId);

    if (!orderDetails) {
      return res.status(404).json({ error: 'Order not found' });
    }

    let populatedOrderDetails;

    switch (orderDetails.serviceType) {
      case 'Package':
        populatedOrderDetails = await getPackageById({ req:{params: { id: orderDetails.serviceId }} }, res);
        break;
      case 'Hotel':
        populatedOrderDetails = await getOneHotel({ params: { id: orderDetails.serviceId } }, res);
        break;
      case 'Taxi':
        populatedOrderDetails = await getTaxiById({ params: { id: orderDetails.serviceId } }, res);
        break;
      case 'Photographer':
        populatedOrderDetails = await getPhotographerById({ params: { id: orderDetails.serviceId } }, res);
        break;
      default:
        return res.status(400).json({ error: 'Invalid serviceType' });
    }

    res.status(200).json({ order: populatedOrderDetails });
  } catch (error) {
    console.error('Error fetching order details:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
