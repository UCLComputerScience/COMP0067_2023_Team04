require('dotenv').config();
const nodemailer = require('nodemailer');
const db = require('./config/db'); // Import the pool from db.js

async function sendOverdueEmails() {
  console.log("Querying overdue loans...");

  // Query overdue loans
  const overdueLoansQuery = `
    SELECT DISTINCT userEmail
    FROM loan
    WHERE dueDate < CURDATE() AND returnedDate IS NULL
  `;
  const [overdueLoans] = await db.query(overdueLoansQuery);

  console.log(`Found ${overdueLoans.length} overdue loans.`);

  // Extract email addresses
  const emailAddresses = overdueLoans.map(row => row.userEmail);

  console.log("Configuring NodeMailer...");

  // Configure NodeMailer
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  console.log("Sending reminder emails...");

  // Send reminder emails
  for (const email of emailAddresses) {
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Overdue Loan Reminder',
      text: 'Please return the borrowed device(s) as your loan is overdue.'
    };

    console.log(`Sending email to ${email}...`);
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}.`);
  }

  console.log("Done sending reminder emails.");
}

// sendOverdueEmails().catch(console.error);
