const express = require('express');
const { sendOtp, validateUserOtp, resetPassword } = require('../Controllers/OptController');

const router = express.Router();

router.post('/forgotpass', sendOtp);
router.post('/validateOtp', validateUserOtp);
router.post('/resetPassword', resetPassword);

module.exports = router;
