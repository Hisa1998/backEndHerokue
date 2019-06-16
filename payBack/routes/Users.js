const config = require('config');
const isImageUrl = require('is-image-url');
const crypto = require('crypto');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
//const sendgrid = require('sendgrid');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/User');
const mongoose = require('mongoose');
const nodeMailer = require('nodemailer');
//const sgMail = require('@sendgrid/mail');
const express = require('express');
const router = express.Router();




//  router.post('/newUser',(req,res)=>{
//    user1= new User();
 
//    user1.UserName= req.body.UserName;
//    user1.UserPassword =req.body.UserPassword;
 
//  user1.UserId=user1._id;
//  user1.save();
//   res.send("3aash");
// });


//Add item
/**
 *
 * @api {POST}  api/User/Add add item to ToDos List
 * @apiName AddItem
 * @apiGroup User
 * @apiParam {String} addItem the Item want to be added
 * @apiSuccess {String}   ReturnMsg   Notifies the User an Email to change his password was sent
 * @apiSuccessExample {json}  Success
 *     HTTP/1.1 200 OK
 *   {
 *     "Success"
 *   }
 * @apiErrorExample {json} InvalidUser-Response:
 *     HTTP/1.1 400
 *   {
 *      "ReturnMsg": "\"UserName\" must be a valid email"
 *   }
 *
 * @apiErrorExample {json} NonExistingUser-Response:
 *     HTTP/1.1 400
 * {
 *   "ReturnMsg":"User Doesn't Exist"
 * }
 *
 */
router.post('/Add', auth, (req, res) => {


 // function auth is responsible to get token and decode it
  USER =req.user._id;// user after decoding the Token
  if (req.query.length == 0) //some validation
  {
    return res.status(400).send("No parameters was sent")
  }
  var add=req.body.addItem;// added item
  User.updateOne( // accesses basic mongodb driver to update one document of Users Collection
    {
        UserId :  USER //access document of user i want to add to his list
    },
    {$push: { // Push to end of array of ToDoS
      ToDo:add
    }},(err)=>{
      if (err)
      return res.status(404).send("Not Found");// if error return not found
      else return res.status(200).send( "Success" );// case of updating succesfully
  
    }
  )
});


//Remove item
/**
 *
 * @api {POST}  api/User/Remove add item to ToDos List
 * @apiName RemoveItem
 * @apiGroup User
 * @apiParam {Number} index the Item want to be Removed  
 * @apiSuccess {String}   ReturnMsg   Notifies the User an Email to change his password was sent
 * @apiSuccessExample {json}  Success
 *     HTTP/1.1 200 OK
 *   {
 *     "Success"
 *   }
 * @apiErrorExample {json} InvalidUser-Response:
 *     HTTP/1.1 400
 *   {
 *      "ReturnMsg": "\"UserName\" must be a valid email"
 *   }
 *
 * @apiErrorExample {json} NonExistingUser-Response:
 *     HTTP/1.1 400
 * {
 *   "ReturnMsg":"User Doesn't Exist"
 * }
 *
 */
router.post('/Remove', auth, async (req, res) => {
 // function auth is responsible to get token and decode it
  USER =req.user._id;// user after decoding the Token
 if (req.query.length == 0)// some validation 
  {
    return res.status(400).send("No parameters was sent")
  }
  index =req.body.index
  var newlist
  await User.findOne( {'UserId': USER },(err,doc) =>  {
    
if (doc)
  {
   if (doc.ToDo.length>index && index>-1)
    {
     newlist = doc.ToDo
    // console.log(doc.ToDo);
     newlist.splice(index,  1)
      }
    else { return res.status(400).send("wrong Index");}

  }   // accesses basic mongodb driver to update one document of Users Collection
    else{ return res.status(404).send("User Not Found");}
    })
    console.log(newlist);
     await User.update({ 'UserId': USER }, {"$set" : {"ToDo" : newlist} })
      return res.status(200).send("Success");
      
    
});

//Add item
/**
 *
 * @api {POST}  api/User/Add add item to ToDos List
 * @apiName AddItem
 * @apiGroup User
 * @apiParam {String} addItem the Item want to be added
 * @apiSuccess {String}   ReturnMsg   Notifies the User an Email to change his password was sent
 * @apiSuccessExample {json}  Success
 *     HTTP/1.1 200 OK
 *   {
 *     "Success"
 *   }
 * @apiErrorExample {json} InvalidUser-Response:
 *     HTTP/1.1 400
 *   {
 *      "ReturnMsg": "\"UserName\" must be a valid email"
 *   }
 *
 * @apiErrorExample {json} NonExistingUser-Response:
 *     HTTP/1.1 400
 * {
 *   "ReturnMsg":"User Doesn't Exist"
 * }
 *
 */
router.get('/MyList', auth, (req, res) => {

 // function auth is responsible to get token and decode it
 USER =req.user._id;// user after decoding the Token

    User.findOne({ 'UserId': USER }, (err, doc) => {
      if (err||!doc) {

        return res.status(404).send("No User was found");
      }

      if (doc) {
        
        return res.status(200).send(doc.ToDo);
      }
    });

  })

module.exports = router;
