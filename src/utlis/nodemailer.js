const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'husnain.umer600@gmail.com',
    pass: 'rbjtnltnpotegyuq'
  }
});
module.exports = transporter;
