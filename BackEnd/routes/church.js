var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const middleware= require('../middleware')
const ChurchModel=require('../models/churchModel')
const MemberModel = require('../models/memberModel')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// Get member details
router.get('/member-details',middleware.athenticateToken,async(req,res,next)=>{
  console.log(req.user)
  const members=await MemberModel.find({churchId:mongoose.Types.ObjectId(req.user.userId)}).exec()
  console.log(members)
  if(!members) return res.status(401).json({"Message":"Failed"})
  res.status(201).json(members)
})

// Add member details
router.post('/add-member',middleware.athenticateToken,async(req,res,next)=>{
  const member={...req.body.data,churchId:mongoose.Types.ObjectId(req.user.userId)}
  await MemberModel.create(member).then(()=>{
    res.status(200).json({"Message":"success"})
  }).catch((err)=>{
    res.status(400).json({"Error":err})
  })
})


module.exports = router;
