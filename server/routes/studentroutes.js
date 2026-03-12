const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// --- 1. STUDENT SCHEMA ---
const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Added Email to link with login
  regNo: { type: String, required: true, unique: true },
  cgpa: { type: Number, required: true },
  skills: { type: String },
  github: { type: String },
  resumePath: { type: String }, 
  updatedAt: { type: Date, default: Date.now }
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

// --- 2. MULTER CONFIGURATION ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  }
});

// --- 3. THE "SAVE CAREER IDENTITY" ROUTE ---
router.post('/update-identity', upload.single('resume'), async (req, res) => {
  try {
    // Make sure 'email' is sent from the frontend form
    const { firstName, lastName, regNo, cgpa, github, skills, email } = req.body;

    const studentData = {
      firstName,
      lastName,
      regNo,
      cgpa,
      github,
      skills,
      email, // Save email to identify the user later
      updatedAt: Date.now()
    };

    if (req.file) {
      studentData.resumePath = req.file.path;
    }

    // We use email as the primary key to find the profile
    const updatedProfile = await Student.findOneAndUpdate(
      { email: email }, 
      studentData,
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Career Identity Saved!",
      profile: updatedProfile
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- 4. NEW: FETCH PROFILE BY EMAIL (FOR DASHBOARD) ---
router.get('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const profile = await Student.findOne({ email: email });
    
    if (!profile) {
      return res.status(404).json({ message: "No profile found" });
    }
    
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;