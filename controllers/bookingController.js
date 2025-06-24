const Booking = require("../models/Booking");

// Create new booking
const addBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    console.log("✅ Created new booking with ID:", newBooking.BookingID);
    res.status(201).json({ 
      success: true,
      message: "Booking created successfully",
      booking: newBooking 
    });
  } catch (err) {
    console.error("❌ Error creating booking:", err);
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ BookingTime: -1 });
    console.log(`📋 Found ${bookings.length} bookings`);
    
    if (!bookings.length) {
      return res.status(404).json({
        success: false,
        message: "No bookings found"
      });
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings: bookings
    });
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get booking by BookingID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ BookingID: Number(req.params.id) });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }
    res.status(200).json({
      success: true,
      booking: booking
    });
  } catch (err) {
    console.error("❌ Error fetching booking:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get bookings by UserID
const getBookingsByUser = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const bookings = await Booking.find({ UserID: userId }).sort({ BookingTime: -1 });
    console.log(`📋 Found ${bookings.length} bookings for user ${userId}`);

    if (!bookings.length) {
      return res.status(404).json({
        success: false,
        message: `No bookings found for user ${userId}`
      });
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings: bookings
    });
  } catch (err) {
    console.error("❌ Error fetching user bookings:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { BookingID: Number(req.params.id) },
      { Status: req.body.Status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking status updated", booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get bookings by status
const getBookingsByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    // Validate status
    if (!["Pending", "Confirmed", "Cancelled"].includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid status. Must be 'Pending', 'Confirmed', or 'Cancelled'" 
      });
    }

    const bookings = await Booking.find({ Status: status });
    console.log(`📋 Found ${bookings.length} bookings with status: ${status}`);

    if (!bookings.length) {
      return res.status(404).json({ 
        success: false,
        message: `No bookings found with status: ${status}` 
      });
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings: bookings
    });
  } catch (err) {
    console.error("❌ Error fetching bookings by status:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

module.exports = {
  addBooking,
  getBookings,
  getBookingById,
  getBookingsByUser,
  updateBookingStatus,
  getBookingsByStatus
};