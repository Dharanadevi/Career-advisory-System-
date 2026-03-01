const Job = require('../controller/Job');

// --- POST A NEW JOB (Staff Only) ---
exports.postJob = async (req, res) => {
  try {
    const { companyName, jobRole, salary, location, description, postedBy } = req.body;

    const newJob = new Job({
      companyName,
      jobRole,
      salary,
      location,
      description,
      postedBy // This will be the Staff's User ID
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(500).json({ message: "Error posting job", error: err.message });
  }
};

// --- GET ALL JOBS (For Students to see) ---
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); // Newest jobs first
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
};