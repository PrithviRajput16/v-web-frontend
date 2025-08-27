const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const collectionsRouter = require('./routes/collections.cjs');
const serviceRouter = require('./routes/services.cjs');
const hospitalRouter = require('./routes/hospitals.cjs')
const procedureCostsRouter = require('./routes/procedureCosts.cjs');

const app = express();
const PORT = process.env.PORT || 6002;

// Enhanced Mongoose Connection Setup
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      dbName: 'healthcare',
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    });
    console.log('MongoDB connected via Mongoose');
  } catch (err) {
    console.error('Mongoose connection error:', err);
    process.exit(1);
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/collections', collectionsRouter);
app.use('/api/services', serviceRouter);
app.use('/api/hospitals', hospitalRouter);
app.use('/api/procedure-costs', procedureCostsRouter);

// Health check with DB status
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  res.json({
    status: 'Healthcare Database API',
    dbStatus: dbStatus === 1 ? 'Connected' : 'Disconnected'
  });
});

// Start server with DB connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server startup failed:', err);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('Mongoose connection closed');
  process.exit(0);
});

// Start the application
startServer();