const mongoose = require("mongoose");
const customerSchema = require('./Customer').schema; // Reuse the schema

const CustomerAdmin = mongoose.models.CustomerAdmin || mongoose.model('CustomerAdmin', customerSchema);

module.exports = CustomerAdmin;