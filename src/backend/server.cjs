const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const path = require('path')

const aboutRouter = require('./routes/about.cjs');
const collectionsRouter = require('./routes/collections.cjs');
const serviceRouter = require('./routes/services.cjs');
const hospitalRouter = require('./routes/hospitals.cjs')
const procedureCostsRouter = require('./routes/procedureCosts.cjs');
const patientOpinionsRouter = require('./routes/patientOpinion.cjs');
const faqsRouter = require('./routes/faqs.cjs');
const assistanceRouter = require('./routes/assistance.cjs');
const doctorRouter = require('./routes/doctor.cjs');
const treatmentRoutes = require('./routes/treatments.cjs');
const doctorTreatmentRouter = require('./routes/doctorTreatments.cjs');
const hospitalTreatmentRouter = require('./routes/hospitalTreatments.cjs');
const bookingsRouter = require('../backend/routes/bookings.cjs');
const adminRoutes = require('./routes/admin.cjs');
const languageRouter = require('./routes/language.cjs');
const headingRouter = require('./routes/headings.cjs')
const blogRouter = require('./routes/blog.cjs')


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
app.use('/api/patient-opinions', patientOpinionsRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/assistance', assistanceRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/treatments', treatmentRoutes);
app.use('/api/doctor-treatment', doctorTreatmentRouter);
app.use('/api/hospital-treatment', hospitalTreatmentRouter);
app.use('/api/booking', bookingsRouter);
app.use('/api/language', languageRouter);
app.use('/api/admin', adminRoutes);
app.use('/api/about', aboutRouter);
app.use('/api/headings', headingRouter);
app.use('/api/blogs', blogRouter);
// Your existing routes
const uploadRoutes = require('./routes/upload.cjs');
app.use('/api/upload', uploadRoutes);
const patientRoutes = require('./routes/patient.cjs');
app.use('/api/patients', patientRoutes);
// Serve static files from public directory
app.use(express.static('public'));

// Serve uploaded files from src/backend/uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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