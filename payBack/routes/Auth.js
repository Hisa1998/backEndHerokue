
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/User');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();




//Login Authentication

/**
 *
 * @api {POST}  /Auth//Signing in by Email and Password
 * @apiName SignIn
 * @apiGroup User
 *
 * @apiParam  {String} UserName  User's UserName
 * @apiParam  {String} UserPassword Password of User
 * @apiSuccess {String}   ReturnMsg   Return Message Log in Successful.
 * @apiSuccess {String} UserId Id of User after Successfully Signing in
 * @apiSuccess {String} Token Authentication Access Token
 * @apiSuccessExample {json}  Success
 *     HTTP/1.1 200 OK
 * {
 *        "ReturnMsg": "Log in Successful.",
 *        "UserId": "5ca23e81783e981f88e1618c",
 *        "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2EyM2U4MTc4M2U5ODFmODhlMTYxOGMiLCJpYXQiOjE1NTQxMzcxMjJ9.rUfROgeq1wgmsUxljg_ZLI2UbFMQubHQEYLKz2zd29Q"
 *   }
 * @apiErrorExample {json} InvalidEmailorPassword-Response:
 *     HTTP/1.1 400
 *  {
 *    "ReturnMsg":"Invalid UserName or password."
 *  }
 *
 */

router.post('/', async (req, res) => {

  let user = await User.findOne({ UserName: req.body.UserName });
  if (!user) return res.status(400).send({"ReturnMsg":"Invalid UserName."});
  if (req.body.UserPassword =!user.UserPassword) return res.status(400).send({"ReturnMsg":"Invalid password."});
  const token = user.generateAuthToken();
    res.send({
      "ReturnMsg": "Log in Successful.",
      "UserId": user.UserId,
     "Token":token
  });
});


module.exports = router;
