// expressServer/oauth/callback.js
// const querystring = require('querystring');
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const isUserAdmin = require('./isUserAdmin');

const API_URL = process.env.API_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
// const CALLBACK_URL = encodeURIComponent(process.env.CALLBACK_URL);
/*
async function isUserAdmin(upi) {
  const managersFilePath = path.join(__dirname, "..", "managers.txt");
  const managersContent = await fs.promises.readFile(managersFilePath, "utf-8");
  const managersList = managersContent.split("\n");
  return managersList.includes(upi);
}
*/
// check if correct
function genToken(user) {
  return jwt.sign(user, JWT_SECRET);
}

// retrieves OAuth access token
async function getToken(code) {
  const response = await fetch(
    `${API_URL}/oauth/token?code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  );
  const data = await response.json();
  console.log("Token data:", data);
  return data;
}

// retrieves user data from API endpoint
async function getUserData(token) {
  const response = await fetch(
    `${API_URL}/oauth/user/data?client_secret=${CLIENT_SECRET}&token=${token}`
  );
  const data = await response.json();
  console.log("User data:", data);
  return data;
}

const callback = async (req, res) => {
  console.log("Entering callback function with query:", req.query);
  if (!req.session.state) {
    res.status(401).send("You need to authorize first");
    return;
  }

  //is this supposed to be req.query or res.query?
  const { result, code, state } = req.query;

  // make sure state match
  if (state !== String(req.session.state)) {
    res.status(500).send("States don't match");
    return;
  }

  // if user says "no"
  if (result === "denied") {
    res.status(400).send("Request denied");
    return;
  }

  // trade auth code for a token
  let json = await getToken(code);

  // update session to include token
  const apiToken = json.token;

  const userData = await getUserData(apiToken);
  const user = {
    department: userData.department,
    email: userData.email,
    full_name: userData.full_name,
    given_name: userData.given_name,
    upi: userData.upi,
    scopeNumber: userData.scope_number,
    apiToken,
  };

  // Set the user role based on the presence of their UPI in managers.txt
  user.role = (await isUserAdmin(user.upi)) ? "admin" : "user";

  // Add the role to the JWT payload
  const jwtToken = genToken({
    ...user,
    role: user.role,
  });
  console.log("Generated JWT Token:", jwtToken);

  // Determine the destination based on the user role
  const destination = user.role === 'admin' ? 'Schedule' : 'userDevices';

  // Send the JWT token back to the mobile app
  res.redirect(`exp://100.66.0.16:19000/--/${destination}?token=${jwtToken}`);
};

module.exports = callback;