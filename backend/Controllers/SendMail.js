const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'stmp.gmail.com',
    port:587,
    secure: true,
    auth:{
        user: 'uterlapu@gitam.in',
        pass: 'yrga ykby csnn wqdp'
    }
}) 

const mailOptions = {
    from:{
        name: 'uttej',
        address: 'uterlapu@gitam.in'
    },
    to: 'uu854225@gmail.com',
    subject:"heelloo",
    text : "hello text",
    html : '<b>Heloo Html , i am from Smtpjs</b>'
}

const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent Successfully')
    } catch(err){
        console.error(err);
    }
}

sendMail(transporter, mailOptions);
