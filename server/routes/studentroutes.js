const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// --- 1. STUDENT SCHEMA ---
// We keep this in the same file for now, or you can move it to models/Student.js
const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  regNo: { type: String, required: true, unique: true },
  cgpa: { type: Number, required: true },
  skills: { type: String },
  github: { type: String },
  resumePath: { type: String }, // Stores the path to the uploaded PDF
  updatedAt: { type: Date, default: Date.now }
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

// --- 2. MULTER CONFIGURATION (RESUME STORAGE) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/'); // Make sure this folder exists in your backend root!
  },
  filename: (req, file, cb) => {
    // Saves file as: 22CS01-1710000000.pdf
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // STRICT 5MB LIMIT
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  }
});

// --- 3. THE "SAVE CAREER IDENTITY" ROUTE ---
// Uses 'upload.single' to catch the "resume" file from your FormData
router.post('/update-identity', upload.single('resume'), async (req, res) => {
  try {
    const { firstName, lastName, regNo, cgpa, github, skills } = req.body;

    // Build the data object
    const studentData = {
      firstName,
      lastName,
      regNo,
      cgpa,
      github,
      skills,
      updatedAt: Date.now()
    };

    // If a file was uploaded, add its path to the database
    if (req.file) {
      studentData.resumePath = req.file.path;
    }

    // findOneAndUpdate with upsert: true will create a new profile 
    // OR update the existing one if the regNo matches.
    const updatedProfile = await Student.findOneAndUpdate(
      { regNo: regNo },
      studentData,
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Career Identity Saved!",
      profile: updatedProfile
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Keep your existing Job routes below if you still need them...
// (GET /all, POST /add, etc.)

module.exports = router;