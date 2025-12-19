const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String },
  nationalId: { type: String },
  phoneNumber: { type: String },
  dateOfBirth: { type: Date },
  role: { type: String, default: 'user' }, // e.g., 'admin', 'guard', 'user'
  district: { type: String },
  sector: { type: String },
  cell: { type: String },
  village: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);