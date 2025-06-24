const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  AddressID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
  Province: { type: String, required: true },
  District: { type: String, required: true },
  Ward: { type: String, required: true },
  Street: { type: String, required: true },
  Details: { type: String },
  IsDefault: { type: Boolean, default: false }
});

module.exports = mongoose.model("Address", addressSchema, "Address");