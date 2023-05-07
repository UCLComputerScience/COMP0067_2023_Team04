// emailScheduler.js
const cron = require('node-cron');
const sendReminderEmails = require('./reminderEmailer');
const sendOverdueEmails = require('./weekendEmailer');

module.exports = {
  scheduleJobs: function() {
    // Schedule the reminder email script to run every day at 9AM
    cron.schedule('0 9 * * *', async () => {
      console.log('Running reminder email script...');
      try {
        await sendReminderEmails();
        console.log('Reminder email script completed successfully.');
      } catch (error) {
        console.error('Error in reminder email script:', error);
      }
    });

    // Schedule the overdue email script to run every Sunday at 9AM
    cron.schedule('0 9 * * SUN', async () => {
      console.log('Running overdue email script...');
      try {
        await sendOverdueEmails();
        console.log('Overdue email script completed successfully.');
      } catch (error) {
        console.error('Error in overdue email script:', error);
      }
    });

    console.log('Cron jobs scheduled.');
  }
};
