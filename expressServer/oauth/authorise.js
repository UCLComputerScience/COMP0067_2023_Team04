// expressServer/oauth/authorise.js
const API_URL = process.env.API_URL;
const CLIENT_ID = process.env.CLIENT_ID;

const authorise = async (req, res) => {
  const state = Math.floor(Math.random() * 100) + 1;
  const redirectURL = decodeURIComponent(
    req.query.return || "exp://100.66.0.216:19000/--/Schedule"
  );
  const url = `${API_URL}/oauth/authorise/?client_id=${CLIENT_ID}&state=${state}`;

  req.session.state = state;
  req.session.redirectURL = redirectURL;
  console.log("Redirecting user to:", url);
  res.redirect(url);
};

module.exports = authorise;
