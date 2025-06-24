// routes/orderItemRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllOrderItems,
  getOrderItemsByOrderId,
  addOrderItem,
  updateOrderItem,
  deleteOrderItem
} = require("../controllers/orderItemController");

// CRUD cho OrderItem
router.get("/list", getAllOrderItems);                         // Lấy tất cả order item
router.get("/order/:orderId", getOrderItemsByOrderId);         // Lấy item theo OrderID
router.get("/:id", (req, res) => res.send("GET single order item - not implemented")); // Optional
router.post("/", addOrderItem);                                // Tạo order item mới
router.put("/:id", updateOrderItem);                           // Cập nhật theo OrderItemID
router.delete("/:id", deleteOrderItem);                        // Xoá theo OrderItemID

module.exports = router;