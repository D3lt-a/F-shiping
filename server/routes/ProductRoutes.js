const express = require('express');
const router = express.Router();

const { creatproduct, getproducts, deleteproduct } = require('../controller/ProductController');

router.post('/createproduct', creatproduct);
router.get('/getproducts', getproducts);
router.delete('/deleteproduct/:Pid', deleteproduct);

module.exports = router;