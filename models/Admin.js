const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
    Admin_Email: { type: String, required: true, unique: true },
    Admin_Password: { type: String, required: true }
});

// Trước khi lưu, hash mật khẩu
adminSchema.pre("save", async function (next) {
    if (!this.isModified("Admin_Password")) return next();
    this.Admin_Password = await bcrypt.hash(this.Admin_Password, 10);
    next();
});

const Admin = mongoose.model("Admin", adminSchema, "admin");
module.exports = Admin;