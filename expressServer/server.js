require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const express = require("express");
const app = express();
const oauthRouter = require('./oauth/index.js');
// const cors = require("cors");

// Middleware
app.use(express.json()); // parse json bodies in the request object
// app.use(cors());
// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/posts", require("./routes/postRoutes"));
// Use the OAuth router
app.use('/connect/uclapi', oauthRouter);

// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went really wrong",
  });
});

// Allows CORS in server side
app.use(function(req, res, next){
  console.log('request', req.url, req.body, req.method);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token");
  next();
})

// Listen on pc port
// const PORT = process.env.PORT || 8080;
app.listen(8080, () => console.log(`Server running on PORT 8080`)); //${PORT}
