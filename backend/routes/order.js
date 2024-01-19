const express = require('express');
const { createOrder, getAllOrders, updatePaymentStatus, updateOrderStatus, getOrdersByUserId, getOrderDetailsById, deleteOrderById } = require('../controllers/orderController');

const router = express.Router();


router.post('/order/create', createOrder);

router.put('/order/update-payment', updatePaymentStatus);

router.put('/order/update-order', updateOrderStatus);

// find all order
router.get('/orders', getAllOrders);

router.get('/order/:userId', getOrdersByUserId);
router.get('/order/details/:orderId', getOrderDetailsById );
router.delete('/order/:orderId', deleteOrderById );

module.exports = router;
