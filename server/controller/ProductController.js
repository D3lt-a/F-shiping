const Product = require('../models/Product');

exports.creatproduct = async (req, res) => {
    const { title, description, image, price, ordered } = req.body;

    try {
        const product = new Product({ title, description, image, price, ordered })
        await product.save();

        res.status(201).json({
            message: 'Product created successfully',
            product
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Error creating product',
            error: error.message
        });
    }
}

exports.getproducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching products',
            error: error.message
        });
    }
}

exports.deleteproduct = async (req, res) => {
    const { Pid } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        res.status(200).json({
            message: 'Product deleted successfully',
            product
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting product',
            error: error.message
        });
    }
}