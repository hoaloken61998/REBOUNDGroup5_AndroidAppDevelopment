const express = require("express");
const { getAllBlogs, createBlog, getBlogById } = require("../controllers/blogController");

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", createBlog);
router.get("/:id", getBlogById);


module.exports = router;