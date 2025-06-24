const Blog = require("../models/Blog");

// Lấy danh sách tất cả blog
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    res.status(500).json({ message: "Error fetching blogs", error: error.message });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log("🔍 Request received for blog ID:", blogId);

    if (!/^\d+$/.test(blogId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID format - must be a number",
        searchedId: blogId
      });
    }

    const blog = await Blog.findOne({ Blog_ID: blogId.toString() });

    // Log the query and result for debugging
    console.log("🔎 Query parameters:", {
      blogId,
      type: typeof blogId,
      found: !!blog
    });

    if (!blog) {
      // Get available blogs for debugging
      const availableBlogs = await Blog.find({}, 'Blog_ID Blog_Title');
      console.log("❌ Blog not found. Available blogs:", 
        availableBlogs.map(b => ({ id: b.Blog_ID, title: b.Blog_Title }))
      );

      return res.status(404).json({ 
        success: false,
        message: "Blog not found",
        searchedId: blogId
      });
    }

    console.log("✅ Blog found:", blog.Blog_Title);
    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error("❌ Error in getBlogById:", error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching blog",
      error: error.message 
    });
  }
};


// Thêm bài viết mới
exports.createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("❌ Error creating blog:", error);
    res.status(500).json({ message: "Error creating blog", error: error.message });
  }
};