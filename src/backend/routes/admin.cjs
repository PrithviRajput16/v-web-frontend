// routes/admin.cjs - FIXED VERSION
const express = require('express');
const {
    adminLogin,
    adminLogout,
    getDashboardStats,
    getHospitals,
    getDoctors,
    getTreatments,
    // getUsers,
    createHospital,
    updateHospital,
    // deleteHospital,
    // createDoctor,
    // updateDoctor,
    // deleteDoctor,
    // createTreatment,
    // updateTreatment,
    // deleteTreatment,
    getHospitalTreatments,
    // updateHospitalTreatment
} = require('../controllers/adminController.cjs');
const { protectAdmin, restrictTo } = require('../middleware/authAdmin.cjs');

// ✅ Use Express Router (NOT the standalone router package)
const router = express.Router();

// Auth routes
router.post('/login', adminLogin);
router.post('/logout', protectAdmin, adminLogout);

// Dashboard
router.get('/dashboard/stats', protectAdmin, getDashboardStats);

// Hospital management
router.get('/hospitals', protectAdmin, getHospitals);
router.post('/hospitals', protectAdmin, restrictTo('superadmin', 'admin'), createHospital);
router.put('/hospitals/:id', protectAdmin, restrictTo('superadmin', 'admin'), updateHospital);
// router.delete('/hospitals/:id', protectAdmin, restrictTo('superadmin'), deleteHospital);

// Doctor management
router.get('/doctors', protectAdmin, getDoctors);
// router.post('/doctors', protectAdmin, restrictTo('superadmin', 'admin'), createDoctor);
// router.put('/doctors/:id', protectAdmin, restrictTo('superadmin', 'admin'), updateDoctor);
// router.delete('/doctors/:id', protectAdmin, restrictTo('superadmin'), deleteDoctor);

// Treatment management
router.get('/treatments', protectAdmin, getTreatments);
// router.post('/treatments', protectAdmin, restrictTo('superadmin', 'admin'), createTreatment);
// router.put('/treatments/:id', protectAdmin, restrictTo('superadmin', 'admin'), updateTreatment);
// router.delete('/treatments/:id', protectAdmin, restrictTo('superadmin'), deleteTreatment);

// Hospital-Treatment management
router.get('/hospital-treatments', protectAdmin, getHospitalTreatments);
// router.put('/hospital-treatments/:id', protectAdmin, restrictTo('superadmin', 'admin'), updateHospitalTreatment);

// User management
// router.get('/users', protectAdmin, restrictTo('superadmin'), getUsers);

module.exports = router;