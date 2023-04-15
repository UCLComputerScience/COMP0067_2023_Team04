const axios = require('axios');
const querystring = require('querystring');

const API_URL = process.env.API_URL;
const CLIENT_ID = process.env.CLIENT_ID;

const authorise = (req, res) => {
  req.session.state = Date.now();
  req.session.redirectURL = req.query.return ? encodeURIComponent(req.query.return) : 'your-app-scheme://auth';
  const url = `${API_URL}/oauth/authorise?client_id=${CLIENT_ID}&state=${req.session.state}`;

  res.redirect(url);
};

module.exports = authorise;