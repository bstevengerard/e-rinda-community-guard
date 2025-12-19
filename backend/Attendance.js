const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Present', 'Absent', 'Late'], default: 'Present' },
  checkInTime: { type: Date, default: Date.now },
  checkOutTime: { type: Date },
  remarks: { type: String }
});

module.exports = mongoose.model('Attendance', attendanceSchema);