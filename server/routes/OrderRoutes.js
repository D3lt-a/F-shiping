const express = require('express');
const router = express.Router();

const { placeOrder, getOrders } = require('../controller/OrderController');

router.post('/placeorder', placeOrder);
router.get('/getorders', getOrders);

module.exports = router;