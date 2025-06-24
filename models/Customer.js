const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
    {
        customer_id: { type: String, required: true, unique: true },
        customer_name: { type: String, required: true },
        customer_email: { type: String, required: true, unique: true },
        customer_phone: { type: String, required: true },  // Changed to String, phone numbers should be stored as strings
        customer_dob: { type: Date, required: true },
        customer_address: { type: String, required: true },
        customer_gender: { type: String, required: true },
        customer_registration_date: { type: Date, required: true },
        customer_type: { type: String, required: true }
    },
    { collection: "customer" } // 🟢 Đặt tên collection là "customer"
);

// Add pre-save hook for debugging
CustomerSchema.pre('save', function(next) {
    console.log('Attempting to save customer:', this);
    next();
});

// Add pre-validate hook for debugging
CustomerSchema.pre('validate', function(next) {
    console.log('Validating customer:', this);
    next();
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
