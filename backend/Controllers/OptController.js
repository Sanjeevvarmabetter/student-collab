const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const { generateOtp, storeOtp, validateOtp } = require('../models/otp');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // should be false if port is 587
    auth: {
        user: 'uterlapu@gitam.in',
        pass: 'yrga ykby csnn wqdp'
    }
});

const sendOtp = async (req, res) => {
    const { email } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ success: false, message: 'User with this email does not exist' });
    }
    
    const otp = generateOtp();
    storeOtp(email, otp);

    const mailOptions = {
        from: {
            name: 'Uttej',
            address: 'uterlapu@gitam.in'
        },
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}`,
        html: `<b>Your OTP code is: ${otp}</b>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ success: true, message: 'OTP sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Failed to send OTP' });
    }
};

const validateUserOtp = (req, res) => {
    const { email, otp } = req.body;
    if (validateOtp(email, otp)) {
        res.status(200).send({ success: true, message: 'OTP validated successfully!' });
    } else {
        res.status(400).send({ success: false, message: 'Invalid OTP' });
    }
};

const resetPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });
        res.status(200).send({ success: true, message: 'Password reset successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Failed to reset password' });
    }
};

module.exports = {
    sendOtp,
    validateUserOtp,
    resetPassword
};
