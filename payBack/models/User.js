const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
ObjectId = mongoose.Schema.Types.ObjectId;
const UserSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true
    },
  UserPassword: {
    type: String,
    required: true
    
  },
  UserId:
  {
    type: String,
  },
 ToDo:{
    type:"array",
    "items":{
      type:String
    }
  },
  });

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'), {expiresIn: '1d'});
  return token;
}
const User = mongoose.model('User', UserSchema);

exports.User = User;
