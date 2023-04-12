const axios = require("axios");
const querystring = require("querystring");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "YOUR_SECRET_KEY"; // Replace with your actual secret key

const getToken = async (code) => {
  // Replace with the actual token URL and parameters if needed
  const response = await axios.post("https://api.ucl.ac.uk/oauth/token", {
    client_id: "YOUR_CLIENT_ID",
    client_secret: "YOUR_CLIENT_SECRET",
    code,
  });
  return response.data;
};

const getUserData = async (token) => {
  // Replace with the actual user data URL if needed
  const response = await axios.get("https://api.ucl.ac.uk/user/data", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const genToken = (user) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
};

const callback = async (req, res) => {
  const { result, code, state } = req.query;

  if (state !== req.session.state) {
    res.status(500).send("States don't match");
    return;
  }

  if (result === "denied") {
    res.status(400).send("Request denied");
    return;
  }

  const { token: apiToken } = await getToken(code);

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

  const token = genToken(user);

  const query = querystring.stringify({ ...user, token });
  res.redirect(`${req.session.redirectURL}?${query}`);
};

module.exports = callback;
