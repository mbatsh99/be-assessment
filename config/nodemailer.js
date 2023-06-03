const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "bostaassissment2023@gmail.com",
    pass: "mvbiravmgzrgamtj",
  },
});

module.exports = transport;
