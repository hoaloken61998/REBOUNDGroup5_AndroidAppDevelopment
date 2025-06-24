const Order = require("../models/Order");

// Create new order
const addOrder = async (req, res) => {
  try {
    // Check if OrderID already exists
    const existingOrder = await Order.findOne({ OrderID: req.body.OrderID });
    if (existingOrder) {
      return res.status(400).json({ 
        success: false,
        error: `Order with ID ${req.body.OrderID} already exists` 
      });
    }

    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    
    console.log("✅ Order created successfully with ID:", savedOrder.OrderID);
    res.status(201).json({ 
      success: true,
      message: "Order created successfully", 
      order: savedOrder 
    });
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders.length) return res.status(404).json({ message: "No orders found" });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get order by OrderID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ OrderID: Number(req.params.id) });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { OrderID: req.params.id },
      req.body,
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order updated", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ OrderID: req.params.id });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get orders by UserID
const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ UserID: req.params.userId });
    if (!orders.length) return res.status(404).json({ message: "No orders found for this user" });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get orders by status
const getOrdersByStatus = async (req, res) => {
  try {
    const orders = await Order.find({ Status: req.params.status });
    if (!orders.length) return res.status(404).json({ message: "No orders with this status" });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { OrderID: req.params.id },
      { Status: req.body.Status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get orders by date range
const getOrdersByDateRange = async (req, res) => {
  try {
    const { start, end } = req.query;
    
    if (!start || !end) {
      return res.status(400).json({ error: "Start and end dates are required" });
    }

    const startDate = new Date(start);
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(end);
    endDate.setUTCHours(23, 59, 59, 999);

    console.log("� Searching for orders between:", startDate, "and", endDate);

    const orders = await Order.find({
      $and: [
        { OrderDate: { $gte: startDate } },
        { OrderDate: { $lte: endDate } }
      ]
    }).exec();

    console.log("📦 Found orders:", orders ? orders.length : 0);

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        message: "No orders found in this date range",
        dateRange: {
          start: startDate,
          end: endDate
        }
      });
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      dateRange: {
        start: startDate,
        end: endDate
      },
      orders: orders
    });

  } catch (err) {
    console.error("❌ Error in getOrdersByDateRange:", err);
    res.status(500).json({ error: "Internal server error while fetching orders" });
  }
};

// Get total revenue in a date range
const getTotalRevenue = async (req, res) => {
  const { start, end } = req.query;
  try {
    if (!start || !end) {
      return res.status(400).json({ 
        success: false,
        error: "Both start and end dates are required" 
      });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);

    console.log("🔍 Searching for completed orders between:", startDate, "and", endDate);

    const orders = await Order.find({
      OrderDate: {
        $gte: startDate,
        $lte: endDate
      },
      Status: "Completed"
    });

    const total = orders.reduce((sum, order) => sum + order.TotalAmount, 0);
    
    console.log(`📊 Found ${orders.length} completed orders with total revenue: ${total}`);

    res.json({
      success: true,
      totalRevenue: total,
      orderCount: orders.length,
      dateRange: {
        start: startDate,
        end: endDate
      }
    });
  } catch (err) {
    console.error("❌ Error calculating revenue:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get order count by status
const getOrderCountByStatus = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: "$Status", count: { $sum: 1 } } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get daily orders count and revenue
const getDailyOrders = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$OrderDate" } },
          count: { $sum: 1 },
          revenue: { $sum: "$TotalAmount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get status of order by OrderID
const getOrderStatusById = async (req, res) => {
  try {
    const order = await Order.findOne({ OrderID: Number(req.params.id) });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ status: order.Status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
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
};