const Category = require("../models/Category");

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      success: true,
      message: "Categories retrieved successfully",
      categories
    });
  } catch (err) {
    console.error("Error in getCategories:", err);
    res.status(500).json({
      success: false,
      message: "Error retrieving categories",
      error: err.message
    });
  }
};

// Get one category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ CategoryID: Number(req.params.id) });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    res.json({
      success: true,
      message: "Category retrieved successfully",
      category
    });
  } catch (err) {
    console.error("Error in getCategoryById:", err);
    res.status(500).json({
      success: false,
      message: "Error retrieving category",
      error: err.message
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
};