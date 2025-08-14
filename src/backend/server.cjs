const express = require('express');
const cors = require('cors');
require('dotenv').config('./config.env');

const collectionsRouter = require('./routes/collections.cjs');

const app = express();
const PORT = process.env.PORT || 6002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/collections', collectionsRouter);

// Health check
app.get('/', (req, res) => {
  res.send('Healthcare Database API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});