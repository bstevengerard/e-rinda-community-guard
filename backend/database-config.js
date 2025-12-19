require('dotenv').config();
const mongoose = require('mongoose');

// Import models
const User = require('./User');
const Attendance = require('./Attendance');
const Report = require('./Report');

// Connection URL as requested: e_rinda_ms
const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/e_rinda_ms';

const ensureCollections = async () => {
  try {
    const db = mongoose.connection.db;
    const collections = ['users', 'attendances', 'reports'];

    for (const collectionName of collections) {
      const collectionsList = await db.listCollections({ name: collectionName }).toArray();
      if (collectionsList.length === 0) {
        await db.createCollection(collectionName);
        console.log(`Collection '${collectionName}' created successfully.`);
      } else {
        console.log(`Collection '${collectionName}' already exists.`);
      }
    }
  } catch (error) {
    console.error('Error ensuring collections:', error.message);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log('Database "e_rinda_ms" is connected and ready.');

    // Ensure collections are created
    await ensureCollections();

    // Note: In MongoDB, collections (tables) are created automatically
    // when you define Schemas and insert documents.
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

// Execute the connection function immediately when this file is required
connectDB().catch(console.error);

module.exports = { User, Attendance, Report };