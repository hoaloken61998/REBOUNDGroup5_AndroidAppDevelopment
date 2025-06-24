const express = require("express");
const router = express.Router();
const {
  addBooking,
  getBookings,
  getBookingById,
  getBookingsByUser,
  updateBookingStatus,
    getBookingsByStatus
} = require("../controllers/bookingController");

// Create and List
router.post("/", addBooking);
router.get("/", getBookings);

// Specific routes (must come before dynamic routes)
router.get("/status/:status", getBookingsByStatus);
router.get("/user/:userId", getBookingsByUser);

// Dynamic routes
router.get("/:id", getBookingById);
router.patch("/:id/status", updateBookingStatus);


module.exports = router;