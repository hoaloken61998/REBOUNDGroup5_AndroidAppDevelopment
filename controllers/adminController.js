const Admin = require("../models/Admin"); // Đảm bảo import đúng model Admin

// Định nghĩa hàm getAdmins để lấy danh sách Admins
const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách Admins:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Export đúng cách
module.exports = { getAdmins };