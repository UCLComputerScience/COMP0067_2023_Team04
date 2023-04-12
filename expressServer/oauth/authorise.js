const axios = require("axios");
const querystring = require("querystring");

const API_URL = "https://api.ucl.ac.uk"; // Replace with the correct API URL if needed
const CLIENT_ID = "YOUR_CLIENT_ID"; // Replace with your actual client ID

const authorise = (req, res) => {
  req.session = {
    state: Date.now(),
    redirectURL: decodeURIComponent(req.query.return) || "UCLAssistant://+auth",
  };
  const url = `${API_URL}/oauth/authorise?client_id=${CLIENT_ID}&state=${req.session.state}`;
  res.redirect(url);
};

module.exports = authorise;
