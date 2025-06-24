const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  Reservation_ID: { type: String, required: true, unique: true },
  Appointment_Time: { type: Date, required: true },
  Reservation_Location: { type: String, required: true },
  Reservation_Note: { type: String, default: 'No specific request' },
  Customer_ID: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema, 'reservation'); // Đảm bảo collection name là 'reservations'