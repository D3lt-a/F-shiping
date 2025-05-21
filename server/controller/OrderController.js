const Orders = require('../models/Orders');

exports.createOrder = async (req, res) => {
    try {
        const { Pid, title } = req.body;

        const newOrder = new Orders({
            Pid,
            title
        });
        await newOrder.save();

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orders = await Orders.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}