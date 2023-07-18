const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },

    // For Gmail => Activate in Gmail "less secure app" option
  });

  // 2) Define email options
  const mailOptions = {
    from: 'S Sen <sen.souransu@yahoo.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Send email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
