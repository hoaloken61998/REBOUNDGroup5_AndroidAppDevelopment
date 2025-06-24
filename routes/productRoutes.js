const express = require('express');
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory
} = require('../controllers/productController');

// Create and List
router.post('/', addProduct);
router.get('/', getProducts);

// Category route must be before /:id to prevent route conflict
router.get('/category/:categoryId', getProductsByCategory);

// Product CRUD routes
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;