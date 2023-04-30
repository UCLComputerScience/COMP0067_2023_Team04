const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  // Get the auth header value
  const bearerHeader = req.headers['authorization'];

  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');

    // Get token from array
    const bearerToken = bearer[1];

    // Verify the token
    jwt.verify(bearerToken, JWT_SECRET, (err, authData) => {
      if(err) {
        console.log("ERROR: token is invalid. Token: ", bearerToken);
        res.sendStatus(403);
      } else {
        req.authData = authData;
        console.log("authData: ", req.authData);
        next();
      }
    });
  } else {
    // Forbidden
    console.log("ERROR: bearer is undefined. bearerHeader: ", bearerHeader);
    res.sendStatus(403);
  }
}

module.exports = verifyToken;