const mongoose = require('mongoose');

/*
    -----This is the Database Schema for the Orders Model-----
    it contains the following fields:
    - Pid : The Id of the product
    - title : The Name of the product
    - orderedAt : The date when the product was ordered
*/

const productSchema = new mongoose.Schema({
    Pid : mongoose.Schema.Types.ObjectId,
    title: string,
    orderedAt : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Orders', productSchema);