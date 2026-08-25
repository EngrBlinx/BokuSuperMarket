const nodemailer = require('nodemailer');

//create a transport object
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmail =async (receiver, mailSubject, body) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: receiver,
        subject: mailSubject,
        text: body 
    };

    try{
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }catch(error){
        console.log('Error sending email', error);
    }
};

module.exports = sendEmail;