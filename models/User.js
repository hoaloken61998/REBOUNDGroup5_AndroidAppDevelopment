const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    UserID: { type: Number, required: true, unique: true },
    FullName: { type: String, required: true },
    PhoneNumber: { type: String, required: true, unique: true },
    Sex: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    Email: { type: String, required: true, unique: true },
    DateOfBirth: { type: Date, required: true },
    RegistrationDate: { type: Date, default: Date.now },
    AvatarURL: { type: String },
    Username: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    UserRanking: { type: String, enum: ['Bạc', 'Vàng', 'Bạch Kim', 'Kim Cương'], default: 'Bạc' }
});

module.exports = mongoose.model("User", userSchema, "User");