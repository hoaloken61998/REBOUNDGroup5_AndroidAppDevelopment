const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
} = require("../controllers/categoryController");

// Read-only endpoints
router.get("/", getCategories);
router.get("/:id", getCategoryById);

module.exports = router;