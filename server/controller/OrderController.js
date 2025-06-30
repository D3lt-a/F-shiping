const nodemailer = require('nodemailer');
const Orders = require('../models/Orders');

exports.placeOrder = async (req, res) => {
    const { customerEmail, productTitle, Pid, orderedAt } = req.body;

    try {
        // Create new order
        const newOrder = new Orders({
            Pid,
            title: productTitle,
            cusEmail: customerEmail,
            orderedAt: orderedAt || Date.now(), // Use current date if not provided
        });

        await newOrder.save();

        // Send email to admin about the new order
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_EMAIL, // your admin email
                pass: process.env.ADMIN_PASSWORD // your app-specific password
            }
        });

        const mailOptions = {
            from: customerEmail,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Order Placed',
            text: `A customer has placed an order for "${productTitle}"\n\nCustomer Email: ${customerEmail}\nOrder ID: ${newOrder._id}`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
    } catch (error) {
        console.error('Error creating order or sending email:', error);
        res.status(500).json({ message: 'Failed to create order or send email.' });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Orders.find().populate('Pid');
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
