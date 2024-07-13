const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName: { type: String, required: true },
    description:  { type: String },
    price: { type: Number, required: true },
    category:  { type: String },
    stockQuantity: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;