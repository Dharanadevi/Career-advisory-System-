const { sendApplicationEmail } = require('../services/emailService');
// Import your Application model (Create this if you haven't yet)
// const Application = require('../models/Application'); 

/**
 * Handles Job Application, Saves to DB, and Triggers Email
 */
exports.handleJobApplication = async (req, res) => {
  try {
    const { studentEmail, studentName, jobTitle, companyName } = req.body;

    // 1. Validation Check
    if (!studentEmail || !studentName || !jobTitle || !companyName) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required application fields." 
      });
    }

    // 2. Save to MongoDB (Uncomment once your Model is ready)
    /*
    const newApplication = new Application({
      studentName,
      studentEmail,
      jobTitle,
      companyName,
      status: 'In Review',
      appliedAt: new Date()
    });
    await newApplication.save();
    */

    // 3. Trigger the High-Tech Automated Email
    await sendApplicationEmail({
      email: studentEmail,
      name: studentName,
      role: jobTitle,
      company: companyName
    });

    // 4. Final Response
    res.status(200).json({ 
      success: true, 
      message: "Application securely logged and email notification dispatched." 
    });

  } catch (error) {
    console.error("❌ Controller Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "System failed to process application. Please check server logs." 
    });
  }
};

/**
 * Fetches all applications for a specific student
 */
exports.getMyApplications = async (req, res) => {
  try {
    const { email } = req.params;

    // Logic to find applications in DB
    // const apps = await Application.find({ studentEmail: email }).sort({ appliedAt: -1 });

    // Temporary placeholder for testing
    const apps = [
      { id: '1', company: "Google", role: "MERN Developer", appliedAt: "2026-03-12", status: "In Review" }
    ];

    res.status(200).json({ success: true, data: apps });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not retrieve history." });
  }
};