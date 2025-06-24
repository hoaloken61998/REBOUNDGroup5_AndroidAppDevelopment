const Customer = require("../models/Customer-admin.js");

// 📌 Lấy danh sách khách hàng
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        console.log("📌 Customers:", customers);
        res.status(200).json(customers);
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách khách hàng:", error);
        res.status(500).json({ message: "Lỗi khi lấy danh sách khách hàng", error });
    }
};

// 📌 Thêm khách hàng mới
const addCustomer = async (req, res) => {
    try {
        const { customer_id, customer_name, customer_email, customer_phone } = req.body;

        // Kiểm tra trùng ID hoặc email
        const existingCustomer = await Customer.findOne({ $or: [{ customer_id }, { customer_email }] });
        if (existingCustomer) {
            return res.status(400).json({ message: "Khách hàng đã tồn tại" });
        }

        const newCustomer = new Customer({ customer_id, customer_name, customer_email, customer_phone });
        await newCustomer.save();
        res.status(201).json({ message: "Thêm khách hàng thành công", newCustomer });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm khách hàng", error });
    }
};

// 📌 Cập nhật khách hàng
const updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCustomer) return res.status(404).json({ message: "Không tìm thấy khách hàng" });

        res.status(200).json({ message: "Cập nhật thành công", updatedCustomer });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật khách hàng", error });
    }
};

// 📌 Xóa khách hàng
const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) return res.status(404).json({ message: "Không tìm thấy khách hàng" });

        res.status(200).json({ message: "Xóa khách hàng thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa khách hàng", error });
    }
};

module.exports = { getCustomers, addCustomer, updateCustomer, deleteCustomer };