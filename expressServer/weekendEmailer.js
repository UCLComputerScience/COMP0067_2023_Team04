require('dotenv').config();
const nodemailer = require('nodemailer');
const db = require('./config/db'); // Import the pool from db.js

module.exports = async function (context, myTimer) {
  // Query overdue loans
  const overdueLoansQuery = `
    SELECT DISTINCT userEmail
    FROM loan
    WHERE dueDate <= CURDATE() AND returnedDate IS NULL
  `;
  const [overdueLoans] = await db.query(overdueLoansQuery);

  // Extract email addresses
  const emailAddresses = overdueLoans.map(row => row.userEmail);

  // Configure NodeMailer
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Send reminder emails
  for (const email of emailAddresses) {
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Overdue Loan Reminder',
      text: 'Please return the borrowed device(s) as your loan is overdue.'
    };

    await transporter.sendMail(mailOptions);
  }
};