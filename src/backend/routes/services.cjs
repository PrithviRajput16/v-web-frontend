const express = require('express');
const { connectDB, closeDB } = require('../config/db.cjs');
const router = express.Router();


router.get('/', async (req, res) => {
  let db;
  try {
    db = await connectDB();
    msg = {msg: 'connected to services'};
    res.json(msg)
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to fetch Services' });
  } finally {
    await closeDB();
  }
});

router.get('/all', async (req, res) => {
  let db;
  try {
    console.log('Attempting to connect to DB...'); // Add this
    db = await connectDB();
    console.log('Fetching services...'); // Add this
    const services = await db.collection('services').find().toArray();
    console.log('Found services:', services.length); // Add this
    res.json(services);
  } catch (err) {
    console.error('SERVER ERROR:', err); // Enhanced logging
    res.status(500).json({ 
      error: 'Failed to fetch Services',
      details: err.message // Include error details
    });
  } 
});

module.exports = router;