// routes/admin.cjs - FIXED VERSION
const express = require('express');
const {
    adminLogin,
    adminLogout,
    getDashboardStats,
    getHospitals,
    getDoctors,
    // getDoctorById,     // ✅ NEW
    // // getTreatments,
    createHospital,
    updateHospital,
    // getHospitalTreatments,
    getHospitalDetails,
    // createDoctor,      // ✅ NEW
    // updateDoctor,      // ✅ NEW
    // deleteDoctor,     // ✅ NEW
    // createHospitalTreatment,     // ✅ NEW
    // updateHospitalTreatment,     // ✅ NEW
    // deleteHospitalTreatment,     // ✅ NEW
    // getHospitalTreatmentById,   // ✅ NEW
    // getDoctorTreatments,
    // getDoctorTreatmentById,
    // createDoctorTreatment,
    // updateDoctorTreatment,
    // deleteDoctorTreatment,
    // getTreatments,
    // getTreatmentById,
    // createTreatment,
    // updateTreatment,
    // deleteTreatment
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
router.get('/hospitaldetails/:hospitalid', protectAdmin, getHospitalDetails);
router.post('/hospitals', protectAdmin, restrictTo('superadmin', 'admin'), createHospital);
router.put('/hospitals/:id', protectAdmin, restrictTo('superadmin', 'admin'), updateHospital);
// router.delete('/hospitals/:id', protectAdmin, restrictTo('superadmin'), deleteHospital);

// Doctor management
router.get('/doctors', protectAdmin, getDoctors);
// router.post('/doctors', protectAdmin, restrictTo('superadmin', 'admin'), createDoctor);
// router.put('/doctors/:id', protectAdmin, restrictTo('superadmin', 'admin'), updateDoctor);
// router.delete('/doctors/:id', protectAdmin, restrictTo('superadmin'), deleteDoctor);

// Treatment management
// router.get('/treatments', protectAdmin, getTreatments);
// router.post('/treatments', protectAdmin, restrictTo('superadmin', 'admin'), createTreatment);
// router.put('/treatments/:id', protectAdmin, restrictTo('superadmin', 'admin'), updateTreatment);
// router.delete('/treatments/:id', protectAdmin, restrictTo('superadmin'), deleteTreatment);

// Hospital-Treatment management
// router.get('/hospital-treatments', protectAdmin, getHospitalTreatments);
// router.put('/hospital-treatments/:id', protectAdmin, restrictTo('superadmin', 'admin'), updateHospitalTreatment);

// User management
// router.get('/users', protectAdmin, restrictTo('superadmin'), getUsers);


// // Doctor management
// router.get('/doctors', protectAdmin, getDoctors);
// router.get('/doctors/:id', protectAdmin, getDoctorById);
// router.post('/doctors', protectAdmin, restrictTo('superadmin', 'admin'), createDoctor);
// router.put('/doctors/:id', protectAdmin, restrictTo('superadmin', 'admin'), updateDoctor);
// router.delete('/doctors/:id', protectAdmin, restrictTo('superadmin'), deleteDoctor);

// // Hospital-Treatment management
// router.get('/hospital-treatments', protectAdmin, getHospitalTreatments);
// router.get('/hospital-treatments/:id', protectAdmin, getHospitalTreatmentById);
// router.post('/hospital-treatments', protectAdmin, restrictTo('superadmin', 'admin'), createHospitalTreatment);
// router.put('/hospital-treatments/:id', protectAdmin, restrictTo('superadmin', 'admin'), updateHospitalTreatment);
// router.delete('/hospital-treatments/:id', protectAdmin, restrictTo('superadmin'), deleteHospitalTreatment);

// // Doctor-Treatment management
// router.get('/doctor-treatments', protectAdmin, getDoctorTreatments);
// router.get('/doctor-treatments/:id', protectAdmin, getDoctorTreatmentById);
// router.post('/doctor-treatments', protectAdmin, restrictTo('superadmin', 'admin'), createDoctorTreatment);
// router.put('/doctor-treatments/:id', protectAdmin, restrictTo('superadmin', 'admin'), updateDoctorTreatment);
// router.delete('/doctor-treatments/:id', protectAdmin, restrictTo('superadmin'), deleteDoctorTreatment);

// // Treatments
// router.get('/treatments', protectAdmin, getTreatments);
// router.get('/treatments/:id', protectAdmin, getTreatmentById);
// router.post('/treatments', protectAdmin, restrictTo('superadmin', 'admin'), createTreatment);
// router.put('/treatments/:id', protectAdmin, restrictTo('superadmin', 'admin'), updateTreatment);
// router.delete('/treatments/:id', protectAdmin, restrictTo('superadmin'), deleteTreatment);





module.exports = router;