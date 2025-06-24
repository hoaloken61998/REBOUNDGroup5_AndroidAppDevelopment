// controllers/orderItemController.js
const OrderItem = require("../models/OrderItem");

// Get all order items
const getAllOrderItems = async (req, res) => {
  try {
    const items = await OrderItem.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get order items by OrderID
const getOrderItemsByOrderId = async (req, res) => {
  try {
    const orderId = Number(req.params.orderId);
    const items = await OrderItem.find({ OrderID: orderId });
    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No items found for this order" });
    }
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get order item by OrderItemID
const getOrderItemById = async (req, res) => {
  try {
    const orderItemId = Number(req.params.id);
    const item = await OrderItem.findOne({ OrderItemID: orderItemId });
    if (!item) {
      return res.status(404).json({ message: "Order item not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new order item
const addOrderItem = async (req, res) => {
  try {
    const newItem = new OrderItem(req.body);
    await newItem.save();
    res.status(201).json({ message: "Order item added", item: newItem });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update order item by ID
const updateOrderItem = async (req, res) => {
  try {
    const updated = await OrderItem.findOneAndUpdate(
      { OrderItemID: Number(req.params.id) },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Order item not found" });
    res.json({ message: "Updated successfully", item: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete order item by ID
const deleteOrderItem = async (req, res) => {
  try {
    const deleted = await OrderItem.findOneAndDelete({ OrderItemID: Number(req.params.id) });
    if (!deleted) return res.status(404).json({ message: "Order item not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllOrderItems,
  getOrderItemsByOrderId,
  getOrderItemById,
  addOrderItem,
  updateOrderItem,
  deleteOrderItem
};
