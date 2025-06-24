const express = require("express");
const router = express.Router();
const { getCustomers, addCustomer, updateCustomer, deleteCustomer } = require("../controllers/customer-adminController");

// 📌 Định nghĩa route
router.get("/", getCustomers);           // Lấy danh sách khách hàng
router.post("/", addCustomer);           // Thêm khách hàng mới
router.put("/:id", updateCustomer);      // Cập nhật khách hàng
router.delete("/:id", deleteCustomer);   // Xóa khách hàng

module.exports = router;