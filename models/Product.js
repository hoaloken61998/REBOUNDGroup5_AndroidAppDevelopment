const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  ProductID: { type: Number, required: true, unique: true },
  CategoryID: { type: Number, required: true },
  StatusID: { type: Number, required: true },
  ProductName: { type: String, required: true },
  ProductDescription: { type: String },
  ProductPrice: { type: String, required: true },
  ProductStockQuantity: { type: Number, default: 0 },
  ImageLink: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema, 'Product');