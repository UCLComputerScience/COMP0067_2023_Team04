// expressServer/server.js
require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const express = require("express");
const session = require("express-session");
const oauthRouter = require('./oauth/index.js');
const verifyToken = require('./oauth/verifyToken').verifyToken;
const fs = require('fs');
const cors = require("cors");
const { scheduleJobs } = require('./emailScheduler'); //scheduled emails

// Middleware
const app = express();
app.use(express.json()); // parse json bodies in the request object

// Allows CORS in server side
app.use(cors({
  origin: '*',  // or specify the domains you want to allow
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-token', 'Authorization'],
}));

app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

// Set up session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto'},
  })
);

// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/posts", require("./routes/postRoutes"));

app.use('/oauth', oauthRouter);
console.log("Began use of /oauth");
// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went really wrong",
  });
});

app.get('/schedule', (req, res) => {
  fs.readFile('schedule.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading schedule');
    } else {
      res.send(data);
    }
  });
});

app.post('/schedule', (req, res) => {
  const newSchedule = req.body.schedule;

  fs.writeFile('schedule.txt', newSchedule, 'utf8', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating schedule');
    } else {
      res.send('Schedule updated')
    }
  });
});

app.get('/getEmail', verifyToken, (req, res) => {
  const email = req.authData.email;
  res.json({ email });
});

scheduleJobs();

// Listen on pc port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on PORT 8080`)); //${PORT}