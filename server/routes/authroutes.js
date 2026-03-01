const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');

// 1. REGISTER / ADD MEMBER (Updated to include Name and auto-password)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const normalizedEmail = email.toLowerCase();

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) return res.status(400).json({ message: "User exists!" });

        // If no password is provided (e.g., admin adding a student), set a default one
        const userPassword = password || "Welcome@123"; 
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        const newUser = new User({ 
            name, 
            email: normalizedEmail, 
            password: hashedPassword, 
            role: role || 'Student' 
        });

        await newUser.save();
        // Return the user object (excluding password) so the frontend can update the list immediately
        const userResponse = newUser.toObject();
        delete userResponse.password;
        
        res.status(201).json(userResponse);
    } catch (err) { 
        console.error(err);
        res.status(500).json({ message: "Server Error" }); 
    }
});

// 2. LOGIN (Remains the same)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong password" });

        res.json({ 
            message: "Welcome", 
            name: user.name,
            role: user.role, 
            email: user.email 
        });
    } catch (err) { res.status(500).json({ message: "Server Error" }); }
});

// 3. GET ALL USERS (New: For Admin Directory)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

// 4. DELETE USER (New: For Admin Control)
router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user" });
    }
});

module.exports = router;