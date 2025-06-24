const express = require("express");
const router = express.Router();
const { getCustomers, addCustomer, updateCustomer, deleteCustomer, getCustomerById, logout, login} = require("../controllers/customerController");
const authMiddleware = require("../middlewares/authMiddleware");

// 📌 Định nghĩa route
router.get("/", authMiddleware, getCustomers);             // Protected route
router.get("/:id", authMiddleware, getCustomerById);      // Protected route
router.post("/", addCustomer);                           // Open route
router.put("/:id", authMiddleware, updateCustomer);      // Protected route
router.delete("/:id", authMiddleware, deleteCustomer);   // Protected route
router.post("/login", login);                            // Open route
router.post("/logout", authMiddleware, logout);


module.exports = router;