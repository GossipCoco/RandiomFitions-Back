const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser')
const express = require("express");
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT || 4048;
const http = require('http')
const app = express();
const helmet = require("helmet")
const SocketIOController = require('./app/controllers/socketIOController')
const rateLimit = require('express-rate-limit');

const Home = require('./app/routes/home')

const limiter = rateLimit({
    windowMs: 15 * 60, // 15 minutes * 1000
    max: 500, // limite chaque IP à 100 requêtes par windowMs
    message: 'Trop de requêtes créées à partir de cette IP, veuillez réessayer après 15 minutes'
  });

  const corsOptions = {
    // origin: '*',
    origin: [
      'http://localhost:8082',
      "http://192.168.1.14:8082",
2
    ],
    cors: {
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    }
  }
  app
  .use('*',cors(corsOptions))
  .use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  .use(bodyParser.json({ limit: '50mb', extended: true }))
  .use(helmet())
  .use('/Home', Home)
  .use(limiter)
  .use(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send({ result: 'error' });
  })

  const serv = http.createServer( app);
serv.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server is running securely on port ${PORT}.`);
  }
  SocketIOController(serv, corsOptions)
  console.log(`Server is running on port ${PORT}.`);
});