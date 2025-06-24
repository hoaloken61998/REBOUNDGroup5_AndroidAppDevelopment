const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  OrderItemID: { type: Number, required: true, unique: true },
  OrderID: { type: Number, required: true },
  ProductID: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  Price: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("OrderItem", orderItemSchema, "OrderItem");