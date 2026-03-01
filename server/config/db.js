const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Using 127.0.0.1 for stability
    await mongoose.connect('mongodb://127.0.0.1:27017/careerPortal');
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
};

module.exports = connectDB;

exports.connectDB = connectDB;
