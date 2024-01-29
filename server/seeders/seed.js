const db = require('../config/connection');
const cleanDB = require('./cleanDB');

const { User } = require('../models');

const userData = require('./userData.json');

try {
    await cleanDB('User', 'users');

    await User.insertMany(userData);
    
    console.log('Users seeded!');
  } catch (error) {
    console.error('Error seeding users:', error.message);
  } finally {
    process.exit(0);
  }
  