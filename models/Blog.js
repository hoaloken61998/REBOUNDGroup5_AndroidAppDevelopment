const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    Blog_ID: { type: String, required: true, unique: true },
    Blog_Title: { type: String, required: true },
    Blog_Image: { type: String, required: true }, // Lưu URL ảnh
    Blog_Date: { type: Date, default: Date.now },
    Blog_shortDescription: { type: String, required: true },
    Blog_fullContent: { type: String, required: true },
    Blog_Category: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema, "blog"); // Đặt tên model và collection đúng

module.exports = Blog;