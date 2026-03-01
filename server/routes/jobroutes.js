const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- 1. SCHEMA & MODEL ---
const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  applicants: { type: Number, default: 0 },
  status: { type: String, default: 'Open' },
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

// --- 2. GET ALL JOBS ---
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    console.error("❌ GET Error:", err.message);
    res.status(500).json({ message: "Server error while fetching jobs" });
  }
});

// --- 3. POST A NEW JOB ---
router.post('/', async (req, res) => {
  console.log("📥 Incoming Job Data:", req.body); // Check your terminal for this!

  try {
    const { company, role, status } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: "Missing required fields: company or role" });
    }

    const newJob = new Job({
      company,
      role,
      status: status || 'Open'
    });

    const savedJob = await newJob.save();
    console.log("✅ Job Saved:", savedJob._id);
    res.status(201).json(savedJob);

  } catch (err) {
    console.error("❌ POST Error:", err.message);
    res.status(500).json({ message: "Could not save job to database" });
  }
});

// --- 4. DELETE A JOB ---
router.delete('/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: "Job not found" });
    
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed: " + err.message });
  }
});

module.exports = router;