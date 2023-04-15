const axios = require('axios');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');

const API_URL = process.env.API_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

function genToken(user) {
  return jwt.sign(user, JWT_SECRET);
}

async function getToken(code) {
  const response = await axios.get(`${API_URL}/oauth/token`, {
    params: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
    },
  });
  return response.data;
}

async function getUserData(token) {
  const response = await axios.get(`${API_URL}/oauth/user/data`, {
    params: {
      client_secret: CLIENT_SECRET,
      token: token,
    },
  });
  return response.data;
}

const callback = async (req, res) => {
  const { result, code, state } = req.query;

  if (!req.session.state) {
    res.status(401).send('You need to authorize first');
    return;
  }

  if (state !== String(req.session.state)) {
    res.status(500).send("States don't match");
    return;
  }

  if (result === 'denied') {
    res.status(400).send('Request denied');
    return;
  }

  const json = await getToken(code);
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

  const jwtToken = genToken(user);
  const queryObj = {
    ...user,
    token: jwtToken,
  };
  const query = querystring.stringify(queryObj);
  res.redirect(`${req.session.redirectURL}?${query}`);
};

module.exports = callback;