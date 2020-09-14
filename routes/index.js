var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const userScheme = new Schema({
  userName: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userScheme);


router.get('/create-user', function (req, res, next) {
  res.render('createUser')
})


router.post('/users', function (req, res, next) {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })

  if (/^[a-zA-Z]+$/.test(req.body.userName)) {
    if (req.body.userName.length > 1 && req.body.userName.length < 25) {
      user.save()
      res.redirect('/users')
    }
    else (res.status(500))
  }
  else (res.status(500))
})

router.get('/users', function (req, res, next) {

  User.find({}, function (err, user) {
    res.render("index", { user })
  });

});

router.get('/users/:userId', function (req, res, next) {

  var userId = req.params["userId"]

  User.findById(userId, function (err, user) {
    res.render("index", { user })
  });

});

module.exports = router;
