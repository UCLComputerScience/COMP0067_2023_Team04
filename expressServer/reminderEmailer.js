require('dotenv').config();
const nodemailer = require('nodemailer');
const db = require('./config/db'); // Import the pool from db.js

module.exports = async function sendReminderEmails() {
  console.log("Querying loans due in 2 days...");

  // Query loans due in 2 days
  const loansDueInTwoDaysQuery = `
    SELECT DISTINCT userEmail
    FROM loan
    WHERE dueDate = DATE_ADD(CURDATE(), INTERVAL 2 DAY) AND returnedDate IS NULL
  `;
  const [loansDueInTwoDays] = await db.query(loansDueInTwoDaysQuery);

  console.log(`Found ${loansDueInTwoDays.length} loans due in 2 days.`);

  // Extract email addresses
  const emailAddresses = loansDueInTwoDays.map(row => row.userEmail);

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
      subject: 'Loan Due Reminder',
      text: 'Please be reminded that you have a loan due in 2 days. Kindly return the borrowed device(s) on time.'
    };

    await transporter.sendMail(mailOptions);
  }

  console.log("Done sending reminder emails.");
}
/*
sendReminderEmails().catch(error => {
  console.error("Error:", error);
  process.exit(1);
});
*/