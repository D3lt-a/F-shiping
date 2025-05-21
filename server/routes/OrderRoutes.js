const express = require('express');
const router = express.Router();

const { createOrder, getOrders } = require('../controller/OrderController');

router.post('/createorder', createOrder);
router.get('/getorders', getOrders);

module.exports = router;