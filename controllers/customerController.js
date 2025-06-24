const Customer = require("../models/Customer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'test_jwt_secret_key';

// Helper function to find customer by ID (avoiding repetition)
const findCustomerById = async (customerId) => {
    return await Customer.findOne({
        $or: [
            { Customer_ID: customerId },
            { customer_id: customerId },
            { customerID: customerId },
            { customerId: customerId }
        ]
    }).lean();
};

// 📌 Get all customers
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        console.error("❌ Error getting customers:", error);
        res.status(500).json({ message: "Error getting customers", error });
    }
};

// 📌 Get customer by ID
const getCustomerById = async (req, res) => {
    try {
        const customer = await findCustomerById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found", searchedId: req.params.id });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error("❌ Error getting customer:", error);
        res.status(500).json({ message: "Error getting customer", error });
    }
};

// 📌 Add new customer
const addCustomer = async (req, res) => {
    try {
        const customerData = { ...req.body };
        if (customerData.Customer_ID && !customerData.customer_id) {
            customerData.customer_id = customerData.Customer_ID;
        } else if (customerData.customer_id && !customerData.Customer_ID) {
            customerData.Customer_ID = customerData.customer_id;
        }

        const newCustomer = new Customer(customerData);
        const savedCustomer = await newCustomer.save();
        res.status(201).json({ message: "Customer added successfully", customer: savedCustomer });
    } catch (error) {
        console.error("❌ Error adding customer:", error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "Duplicate key error", error: "DuplicateKey", details: error.keyValue });
        }
        res.status(500).json({ message: "Error adding customer", error: error.message });
    }
};

// 📌 Update customer
const updateCustomer = async (req, res) => {
    try {
        const existingCustomer = await findCustomerById(req.params.id);
        if (!existingCustomer) {
            return res.status(404).json({ message: "Customer not found", searchedId: req.params.id });
        }

        const updatedCustomer = await Customer.findOneAndUpdate(
            { $or: [{ Customer_ID: req.params.id }, { customer_id: req.params.id }] },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: "Customer updated successfully", customer: updatedCustomer });
    } catch (error) {
        console.error("❌ Error updating customer:", error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "Duplicate key error", error: "DuplicateKey", details: error.keyValue });
        }
        res.status(500).json({ message: "Error updating customer", error: error.message });
    }
};

// 📌 Delete customer
const deleteCustomer = async (req, res) => {
    try {
        const existingCustomer = await findCustomerById(req.params.id);
        if (!existingCustomer) {
            return res.status(404).json({ message: "Customer not found", searchedId: req.params.id });
        }

        const deletedCustomer = await Customer.findOneAndDelete({ $or: [{ Customer_ID: req.params.id }, { customer_id: req.params.id }] });
        res.status(200).json({ message: "Customer deleted successfully", deletedCustomer });
    } catch (error) {
        console.error("❌ Error deleting customer:", error);
        res.status(500).json({ message: "Error deleting customer", error: error.message });
    }
};

// 📌 Login customer
const login = async (req, res) => {
    const { email, password } = req.body; // We will ignore password for now

    try {
        // Find customer by email with case-insensitive search
        const customer = await Customer.findOne({
            $or: [
                { customer_email: { $regex: new RegExp(`^${email}$`, 'i') } },
                { Customer_Email: { $regex: new RegExp(`^${email}$`, 'i') } },
            ]
        });

        if (!customer) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Log the found customer for debugging purposes
        console.log("Found customer:", customer);

        // Convert Mongoose document to plain JavaScript object
        const customerObj = customer.toObject();
        console.log(customerObj);

        // Generate JWT token for the logged-in user (ignoring password)
        const token = jwt.sign({ customerId: customer._id, email }, JWT_SECRET_KEY, { expiresIn: '1h' });

        // Return token and full customer data
        return res.status(200).json({
            message: 'Login successful',
            token,
            customer: {
                customerId: customerObj.Customer_ID,
                fullName: customerObj.Customer_Name,
                email: customerObj.Customer_Email,
                phoneNumber: customerObj.Customer_Phone,
                address: customerObj.Customer_Address,
                sex: customerObj.Customer_Gender,
                dob: customerObj.Customer_DOB,
                type: customerObj.Customer_Type
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};





// 📌 Logout customer
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out', error: err });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

module.exports = { getCustomers, addCustomer, updateCustomer, deleteCustomer, getCustomerById, login, logout };
