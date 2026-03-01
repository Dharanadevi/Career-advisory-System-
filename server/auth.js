const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the model
const bcrypt = require('bcryptjs');

// POST: http://localhost:5000/api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // 2. Compare Password
        // If you haven't encrypted passwords yet, use: if (password !== user.password)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 3. Send Success Response
        res.json({
            message: "Login successful",
            role: user.role,
            email: user.email,
            id: user._id
        });

    } catch (error) {
        res.status(500).json({ message: "Server error during login" });
    }
});

module.exports = router;