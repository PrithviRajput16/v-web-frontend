const { MongoClient } = require('mongodb');
require('dotenv').config({path: './config.env'});

let client;

const connectDB = async () => {
  try {
    client = new MongoClient(process.env.ATLAS_URI);
    await client.connect();
    console.log('MongoDB connected');
    return client.db('healthcare');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const closeDB = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
};

module.exports = { connectDB, closeDB };