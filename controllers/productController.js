const Product = require('../models/Product');
const Category = require('../models/Category');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ ProductName: 1 });
    console.log("📌 Found", products.length, "products");

    if (!products || products.length === 0) {
      console.log("❌ No products found in database");
      return res.status(404).json({ 
        success: false,
        message: "No products found" 
      });
    }

    res.status(200).json({
      success: true,
      count: products.length,
      products: products
    });
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Create new product
const addProduct = async (req, res) => {
  try {
    // Check if product with same ID already exists
    const existingProduct = await Product.findOne({ ProductID: req.body.ProductID });
    if (existingProduct) {
      return res.status(400).json({ 
        success: false,
        message: `Product with ID ${req.body.ProductID} already exists` 
      });
    }

    console.log("📌 Adding new product:", req.body);
    const newProd = new Product(req.body);
    await newProd.save();
    
    console.log("✅ Product created successfully:", newProd.ProductID);
    res.status(201).json({ 
      success: true,
      message: "Product created successfully",
      product: newProd 
    });
  } catch (err) {
    console.error("❌ Error creating product:", err);
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get product by ProductID
const getProductById = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID. Must be a number."
      });
    }

    const product = await Product.findOne({ ProductID: productId });
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: `Product with ID ${productId} not found` 
      });
    }

    res.status(200).json({
      success: true,
      product: product
    });
  } catch (err) {
    console.error("❌ Error fetching product:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID. Must be a number."
      });
    }

    const product = await Product.findOneAndUpdate(
      { ProductID: productId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: `Product with ID ${productId} not found` 
      });
    }

    console.log("✅ Product updated successfully:", productId);
    res.status(200).json({ 
      success: true,
      message: "Product updated successfully",
      product: product 
    });
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID. Must be a number."
      });
    }

    const product = await Product.findOneAndDelete({ ProductID: productId });
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: `Product with ID ${productId} not found` 
      });
    }

    console.log("✅ Product deleted successfully:", productId);
    res.status(200).json({ 
      success: true,
      message: "Product deleted successfully",
      product: product
    });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = Number(req.params.categoryId);
    
    if (isNaN(categoryId)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid category ID. Must be a number." 
      });
    }

    // First, check if category exists
    const category = await Category.findOne({ CategoryID: categoryId });
    if (!category) {
      return res.status(404).json({ 
        success: false,
        message: `Category with ID ${categoryId} not found` 
      });
    }

    console.log(`🔍 Searching for products in category: ${category.CategoryName} (ID: ${categoryId})`);

    const products = await Product.find({ CategoryID: categoryId })
      .sort({ ProductName: 1 });  // Sort by product name alphabetically

    console.log(`📦 Found ${products.length} products in category ${category.CategoryName}`);

    if (!products.length) {
      return res.status(404).json({ 
        success: false,
        message: `No products found in category: ${category.CategoryName}`,
        category: {
          id: category.CategoryID,
          name: category.CategoryName
        }
      });
    }

    res.status(200).json({
      success: true,
      count: products.length,
      category: {
        id: category.CategoryID,
        name: category.CategoryName
      },
      products: products.map(product => ({
        ProductID: product.ProductID,
        ProductName: product.ProductName,
        ProductDescription: product.ProductDescription,
        ProductPrice: product.ProductPrice,
        ProductStockQuantity: product.ProductStockQuantity,
        ImageLink: product.ImageLink,
        StatusID: product.StatusID
      }))
    });
  } catch (err) {
    console.error("❌ Error fetching products by category:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory
};