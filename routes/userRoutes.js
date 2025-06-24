const express = require("express");
const router = express.Router();
const {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getUserOrders,
  getUserProfile,
} = require("../controllers/userController");

router.get("/", getUser);      
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Các endpoint mở rộng
router.get("/:id/orders", getUserOrders);
router.get("/:id/profile", getUserProfile);


module.exports = router;