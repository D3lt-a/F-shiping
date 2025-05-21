const mongoose = require('mongoose');

/*
    -----This is the Database Schema for the Product Model-----
    it contains the following fields:
    - title : The Name of the product
    - description : The description of the product
    - price : The price of the product
    - image : The image of the product
    - ordered : IF the product is ordered or not by default it is not 

    For future development, we can add more fields to this schema
    - category : others 
    - createdAt : When the product was created
    - updatedAt : When the product was updated
*/

const productSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    image : String,
    ordered : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('Product', productSchema);