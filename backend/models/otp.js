const crypto = require('crypto');

let otpStorage = {}; // Temporary storage for OTPs

const generateOtp = () => {
    return crypto.randomBytes(3).toString('hex');
};

const storeOtp = (email, otp) => {
    otpStorage[email] = otp;
};

const validateOtp = (email, otp) => {
    if (otpStorage[email] === otp) {
        delete otpStorage[email];
        return true;
    }
    return false;
};

module.exports = {
    generateOtp,
    storeOtp,
    validateOtp
};
