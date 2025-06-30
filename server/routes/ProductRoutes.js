const express = require('express');
const router = express.Router();

const { creatproduct, getprodcutsById, getproducts, deleteproduct } = require('../controller/ProductController');
const { image } = require('../controller/ProductController');

router.post('/createproduct', image.single('image'), creatproduct);
router.get('/getproducts', getproducts)
router.get('/getproduct/:id', getprodcutsById)
router.delete('/deleteproduct/:id', deleteproduct)

module.exports = router;