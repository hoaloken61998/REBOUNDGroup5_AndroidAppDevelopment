const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        console.error("❌ Error creating reservation:", error);
        res.status(400).json({ error: error.message });
    }
};

exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        if (!reservations.length) {
            return res.status(404).json({ message: "No reservations found." });
        }
        res.json(reservations);
    } catch (error) {
        console.error("❌ Error fetching reservations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};