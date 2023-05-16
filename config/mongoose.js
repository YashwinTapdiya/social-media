const mongoose = require('mongoose');

async function db() {
  try {
    await mongoose.connect('mongodb://localhost:27017/codeial_development');
    console.log('Connected to Database :: MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = db;
