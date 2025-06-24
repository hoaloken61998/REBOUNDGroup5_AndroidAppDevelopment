

const Address = require("../models/Address");

// Get all addresses
const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find();
        res.json(addresses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAddressByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const addresses = await Address.find({ UserID: userId });
        if (!address) return res.status(404).json({ message: "Address not found" });
        res.json(address);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get address by AddressID
const getAddressById = async (req, res) => {
    try {
        const address = await Address.findOne({ AddressID: req.params.id });
        if (!address) return res.status(404).json({ message: "Address not found" });
        res.json(address);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add new address
const addAddress = async (req, res) => {
    try {
        const newAddress = new Address(req.body);
        await newAddress.save();
        res.status(201).json({ message: "Address added successfully", address: newAddress });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update address by AddressID
const updateAddress = async (req, res) => {
    try {
        const updated = await Address.findOneAndUpdate(
            { AddressID: req.params.id },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Address not found" });
        res.json({ message: "Address updated", address: updated });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete address by AddressID
const deleteAddress = async (req, res) => {
    try {
        const deleted = await Address.findOneAndDelete({ AddressID: req.params.id });
        if (!deleted) return res.status(404).json({ message: "Address not found" });
        res.json({ message: "Address deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAddresses,
    getAddressById,
    addAddress,
    updateAddress,
    deleteAddress,
    getAddressByUserId
};