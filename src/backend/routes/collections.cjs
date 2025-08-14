const express = require('express');
const { connectDB, closeDB } = require('../config/db.cjs');
const router = express.Router();

router.get('/', async (req, res) => {
  let db;
  try {
    db = await connectDB();
    const collections = await db.listCollections().toArray();
    res.json(collections.map(col => col.name));
   
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to fetch collections' });
  } finally {
    await closeDB();
  }
});

module.exports = router;