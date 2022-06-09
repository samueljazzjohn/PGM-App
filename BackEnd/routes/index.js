var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
const UserModel = require('../models/userModel')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello World');
});

router.post('/register',(req,res,next)=>{
  console.log('register')
  
})

router.get('/login', function(req, res, next) {
  console.log(req.body)
});

module.exports = router;
