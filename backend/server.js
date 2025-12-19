// Load environment variables if .env file exists
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Attendance, Report } = require('./database-config');

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_change_this';

// Middleware
app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ detail: 'Token missing' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ detail: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// --- Routes ---

// 1. Register
app.post('/auth/register', async (req, res) => {
  try {
    const { 
      username, email, password, full_name, national_id, 
      phone_number, date_of_birth, role, district, sector, cell, village 
    } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ detail: 'Username or Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fullName: full_name,
      nationalId: national_id,
      phoneNumber: phone_number,
      dateOfBirth: date_of_birth,
      role: role || 'user',
      district, sector, cell, village
    });

    await newUser.save();

    // Return user without password
    const userObj = newUser.toObject();
    delete userObj.password;
    
    // Map _id to id for frontend consistency
    userObj.id = userObj._id;

    res.status(201).json(userObj);
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ detail: error.message });
  }
});

// 2. Login
app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ detail: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.json({ access_token: token, token_type: 'bearer' });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ detail: error.message });
  }
});

// 3. Get Current User
app.get('/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ detail: 'User not found' });
    
    const userObj = user.toObject();
    userObj.id = userObj._id;
    userObj.full_name = userObj.fullName; // Map back for frontend
    
    res.json(userObj);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

// 4. Dashboard Data
app.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    // Example dashboard data
    const stats = {
      totalUsers: await User.countDocuments(),
      pendingReports: await Report.countDocuments({ status: 'Pending' }),
      activeGuards: await User.countDocuments({ role: 'guard' })
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

// 5. Create Attendance (Check-in)
app.post('/api/attendance/checkin', authenticateToken, async (req, res) => {
  try {
    const { userId, remarks } = req.body; // api.ts sends userId and remarks (mapped from status)
    
    const newAttendance = new Attendance({
      user: userId || req.user.id,
      status: 'Present',
      remarks: remarks,
      checkInTime: new Date()
    });

    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

// 6. Get Attendance History
app.get('/api/attendance', authenticateToken, async (req, res) => {
  try {
    let query = {};
    // If not admin/guard, only show own attendance
    if (req.user.role !== 'admin' && req.user.role !== 'guard') {
      query.user = req.user.id;
    }
    const records = await Attendance.find(query)
      .populate('user', 'username fullName')
      .sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

// 7. Create Report
app.post('/api/reports', authenticateToken, async (req, res) => {
  try {
    const { title, description, location, category } = req.body;
    const newReport = new Report({
      title,
      description,
      location,
      category,
      submittedBy: req.user.username,
      status: 'Pending'
    });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

// 8. Get Reports
app.get('/api/reports', authenticateToken, async (req, res) => {
  try {
    const reports = await Report.find().sort({ date: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

// 9. Update Report Status
app.patch('/api/reports/:id', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(report);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

// 10. Health Check (Root Endpoint)
app.get('/', (req, res) => {
  res.send('e-Rinda Community Guard API is running');
});

// 404 Handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ detail: 'Endpoint not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});