// IMportant requires 
const config = require('config')
const jwt = require('jsonwebtoken');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
// the routes used till now
const Auth = require('./routes/Auth');
const app = express();
const Users= require('./routes/Users')


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

app.use(express.static('static'));
// connecting to the database
mongoose.connect('mongodb+srv://admin:admin@cluster0-zqckq.mongodb.net/test',{ useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error(err));

app.use(express.json());

// 
app.use('/api/Users', Users);
app.use('/api/Auth', Auth);
app.use((req, res, next) => {
  console.log("caught this path and redirected to index", req.path);
  res.sendFile(__dirname + '/static/index.html');
  });
// the port where the application run
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// importannt Exports
module.exports.app= app;
