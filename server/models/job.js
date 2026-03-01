const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
  applicants: { type: Number, default: 0 },
  postedBy: { type: String }, // Can store the staff name/ID
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);