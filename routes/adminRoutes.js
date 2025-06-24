const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

console.log("✅ adminController:", adminController); // Debug để kiểm tra import

router.get("/", adminController.getAdmins); // API lấy danh sách Admins

module.exports = router;