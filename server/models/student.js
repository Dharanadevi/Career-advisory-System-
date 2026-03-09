const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  regNo: { type: String, required: true, unique: true },
  cgpa: { type: Number, required: true },
  skills: { type: String },
  github: { type: String },
  resumePath: { type: String }, // Stores the location of the PDF
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);