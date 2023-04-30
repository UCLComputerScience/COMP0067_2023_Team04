// isUserAdmin.js
const fs = require('fs');
const path = require('path');

async function isUserAdmin(upi) {
  const managersFilePath = path.join(__dirname, "..", "managers.txt");
  const managersContent = await fs.promises.readFile(managersFilePath, 'utf-8');
  const managersList = managersContent.split('\n');
  return managersList.includes(upi);
}

module.exports = isUserAdmin;