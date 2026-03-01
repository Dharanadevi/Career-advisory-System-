const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 1. Define the Job Schema
const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  applicants: { type: Number, default: 0 },
  status: { type: String, default: 'Open' },
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

// 2. GET all jobs (Fetch for Dashboard)
router.get('/all', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. POST a new job (From Modal)
router.post('/add', async (req, res) => {
  const newJob = new Job({
    company: req.body.company,
    role: req.body.role,
    status: req.body.status
  });

  try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. DELETE a job
router.delete('/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;