const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  OrderID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
  PaymentMethodID: { type: Number, required: true },
  OrderDate: { type: Date, default: Date.now },
  Status: { 
    type: String, 
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending"
  },
  Subtotal: { type: Number, required: true },
  DiscountValue: { type: Number, default: 0 },
  DeliveryFee: { type: Number, default: 0 },
  UserPromotion: { type: Number, default: 0 },
  TotalAmount: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Order", orderSchema, "Order");