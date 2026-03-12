const Student = require('../models/Student'); // Your MERN Schema

// GET: Find identity by Email
export const getStudentProfile = async (req, res) => {
    try {
        const { email } = req.params;

        // .findOne looks for the specific document you saved
        const studentProfile = await Student.findOne({ email: email });

        if (!studentProfile) {
            return res.status(404).json({ message: "No identity found for this user." });
        }

        // Sending the exact data back to the frontend
        res.status(200).json(studentProfile);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching profile", error });
    }
};