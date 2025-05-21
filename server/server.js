require('dotenv').config();

const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');

const ProductRoutes = require('./routes/ProductRoutes');
const OrderRoutes = require('./routes/OrderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/orders', OrderRoutes);
app.use('/products', ProductRoutes);

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });