const nodemailer = require('nodemailer');
const Orders = require('../models/Orders');

exports.placeOrder = async (req, res) => {
    const { productId: Pid, customerEmail, customerNumber, customerName, productTitle, orderedAt } = req.body;

    try {
        // Create new order
        const newOrder = new Orders({
            Pid,
            title: productTitle,
            cusName: customerName,
            cusEmail: customerEmail,
            cusNumber: customerNumber,
            orderedAt: orderedAt || Date.now(), 
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
            subject: '🛒 New Order Placed - FShipping',
            html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #007BFF;">New Order Notification</h2>
      <p>A customer has just placed an order through the FShipping platform.</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;"><strong>Product:</strong></td>
          <td style="padding: 8px; border: 1px solid #ccc;">${productTitle}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;"><strong>Customer Name:</strong></td>
          <td style="padding: 8px; border: 1px solid #ccc;">${customerName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;"><strong>Email:</strong></td>
          <td style="padding: 8px; border: 1px solid #ccc;">${customerEmail}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;"><strong>Phone Number:</strong></td>
          <td style="padding: 8px; border: 1px solid #ccc;">${customerNumber}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;"><strong>Order ID:</strong></td>
          <td style="padding: 8px; border: 1px solid #ccc;">${newOrder._id}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;"><strong>Order Date:</strong></td>
          <td style="padding: 8px; border: 1px solid #ccc;">${new Date(newOrder.orderedAt).toLocaleString()}</td>
        </tr>
      </table>

      <p style="margin-top: 20px;">Please follow up with the customer promptly.</p>
      <p style="color: #888; font-size: 12px;">This is an automated message from FShipping System.</p>
    </div>
  `,
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
