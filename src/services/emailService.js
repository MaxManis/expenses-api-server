"use strict";

const nodemailer = require("nodemailer");
require("dotenv/config");

let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_APP_PASSWORD,
    },
});

const sendEmail = async ({ mailTo, subject, content }) => {
    return await transporter.sendMail({
        from: 'xpns@auth.com',
        to: mailTo,
        subject,
        text: "Cant open data from this mail :(",
        html: content,
    });
};

const sendUserActivationLink = (mailTo, token) => {
    const link = `${process.env.CLIENT_ORIGIN_URL}/#/activate/${token}`;

    return sendEmail({
        mailTo,
        subject: 'Activate your XPNS account',
        content: `
            <h1>Click the link to activate your account</h1>
            <a href="${link}">${link}</a>
        `,
    });
};

module.exports = {
    sendEmail,
    sendUserActivationLink,
};
