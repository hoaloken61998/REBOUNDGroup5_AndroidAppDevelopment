const User = require("../models/User");
const Address = require("../models/Address");
const Order = require("../models/Order");


// Create new user
const addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ UserID: req.params.id });
    if (!user) return res.status(404).json({ message: "User not found" });

    const address = await Address.findOne({ UserID: user.UserID });

    res.json({ ...user.toObject(), address });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all users
const getUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    console.log("📌 Trả về", users.length, "user(s)");
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Lỗi:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { UserID: req.params.id },
      req.body,
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ UserID: req.params.id });
    if (!result) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get user order history
const getUserOrders = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const orders = await Order.find({ UserID: userId }).sort({ OrderDate: -1 });

    const formattedOrders = orders.map(order => ({
      OrderID: order.OrderID,
      OrderDate: order.OrderDate,
      Status: order.Status,
      Subtotal: order.Subtotal,
      DiscountValue: order.DiscountValue,
      DeliveryFee: order.DeliveryFee,
      UserPromotion: order.UserPromotion,
      TotalAmount: order.TotalAmount,
      PaymentMethodID: order.PaymentMethodID
    }));

    res.status(200).json({
      userId,
      totalOrders: formattedOrders.length,
      orders: formattedOrders
    });
  } catch (err) {
    console.error("❌ Error getting user orders:", err);
    res.status(500).json({ error: "Error retrieving user orders" });
  }
};

// Get user profile including all non-sensitive fields
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ UserID: Number(req.params.id) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProfile = {
      UserID: user.UserID,
      FullName: user.FullName,
      PhoneNumber: user.PhoneNumber,
      Sex: user.Sex,
      Email: user.Email,
      DateOfBirth: user.DateOfBirth,
      RegistrationDate: user.RegistrationDate,
      AvatarURL: user.AvatarURL,
      Username: user.Username,
      UserRanking: user.UserRanking
    };

    res.status(200).json(userProfile);
  } catch (err) {
    console.error("Error getting user profile:", err);
    res.status(500).json({ error: "Error retrieving user profile" });
  }
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserOrders,
  getUserProfile
};