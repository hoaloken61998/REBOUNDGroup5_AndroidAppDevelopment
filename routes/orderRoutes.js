const express = require("express");
const router = express.Router();
const {
    addOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByUserId,
    getOrdersByStatus,
    updateOrderStatus,
    getOrdersByDateRange,
    getTotalRevenue,
    getOrderCountByStatus,
    getDailyOrders,
    getOrderStatusById
} = require("../controllers/orderController");


// CRUD
router.post("/", addOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

// Truy vấn
router.get("/user/:userId", getOrdersByUserId);
router.get("/status/:status", getOrdersByStatus);
router.patch("/:id/status", updateOrderStatus);
router.get("/date-range", getOrdersByDateRange);
router.get("/:id/status", getOrderStatusById);

// Thống kê
router.get("/summary/revenue", getTotalRevenue);
router.get("/summary/status", getOrderCountByStatus);
router.get("/summary/daily", getDailyOrders);

module.exports = router;