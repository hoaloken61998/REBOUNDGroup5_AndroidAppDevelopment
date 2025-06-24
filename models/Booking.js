const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  BookingID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
  ServiceID: { type: Number, required: true },
  BookingTime: { type: Date, required: true },
  LocationID: { type: Number, required: true },
  Status: { type: String, enum: ["Completed", "Booked", "Cancelled", "Pending"], default: "Booked" }
}, {
  timestamps: true
});

module.exports = mongoose.model("BookingSchedule", bookingSchema, "BookingSchedule");