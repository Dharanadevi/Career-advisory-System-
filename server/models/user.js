const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // ADDED: Name field to store student/staff names
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true // Ensures emails are always stored in lowercase
  },
  password: { 
    type: String, 
    required: true 
  },
  // UPDATED: Default to lowercase 'student' to match your previous logic
  role: { 
    type: String, 
    required: true, 
    default: 'student',
    enum: ['student', 'staff', 'admin'] // Prevents accidental role types
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);