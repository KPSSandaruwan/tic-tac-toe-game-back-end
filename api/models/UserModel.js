const mongoose = require('mongoose');
let bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const SALT = 10;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
});


// Saving user data
UserSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    //checking if password field is available and modified
    bcrypt.genSalt(SALT, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// For comparing the users entered password with database duing login
UserSchema.methods.comparePassword = function (candidatePassword, callBack) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callBack(err);
    callBack(null, isMatch);
  });
};

// For generating token when loggedin
UserSchema.methods.generateToken = function (callBack) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), process.env.SECRETE);

  callBack(null, token);
};

UserSchema.statics.findByToken = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRETE, (err, decode) => {
      if (err) {
        return reject('Invalid Token');
      }
      
      User.findById(decode)
        .then((user) => {
          if (!user) {
            reject('Invalid User ID');
          } else {
            resolve(user);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};



const User = mongoose.model('User', UserSchema);
module.exports = { User }
