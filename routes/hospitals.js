const express = require('express');
const { getHospital, getHospitals, deleteHospital, createHospital, updateHospital } = require('../controllers/hospitals');
const appointmentRouter = require('./appointments');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Appointment = require('../models/Appointment');

router.use('/:hospitalId/appointments/', appointmentRouter)
router.route('/').get(getHospitals).post(protect, authorize("admin"),createHospital);
router.route('/:id').get(getHospital).put(protect,authorize("admin") ,updateHospital).delete(protect,authorize("admin"), deleteHospital);

module.exports = router;