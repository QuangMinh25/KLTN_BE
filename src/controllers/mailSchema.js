const mailTemplate = require('../config/template')
const nodemailer = require("nodemailer");

exports.send = async (code, email) => {
  try {
    const template = mailTemplate.mailTemplate(code)
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'khoaluan2022@gmail.com',
        pass: 'lsvaojommidvuonu'
      }
    });

    var mailOptions = {
      from: 'khoaluan2022@gmail.com',
      to: email,
      subject: 'Đăng ký vé tàu thành công',
      html: template
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return
  } catch (e) {
    console.log('<><><><>', e)
    return
  }
}