var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const middleware= require('../middleware');
const { findOne } = require('../models/churchModel');
const ChurchModel=require('../models/churchModel')
const MemberModel = require('../models/memberModel')
const RevenueExpenseModel = require('../models/revenueExpenseModel')

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

// Add committee members
router.patch('/add-committee-member',middleware.athenticateToken,async(req,res,next)=>{
  console.log(req.body)
  if(req.body.position==='president'){
    ChurchModel.findOneAndUpdate({userId:mongoose.Types.ObjectId(req.user.userId)},{"committe.president":req.body.memberName},{upsert:true},(err,result)=>{
      if (err) return res.status(400).json({"Error":err})
      return res.status(200).json({"Message":"success"})
    })
  }else if(req.body.position==='secretary'){
    ChurchModel.findOneAndUpdate({userId:mongoose.Types.ObjectId(req.user.userId)},{"committe.secretary":req.body.memberName},{upsert:true},(err,result)=>{
      if (err) return res.status(400).json({"Error":err})
      return res.status(200).json({"Message":"success"})
    })
  }else if(req.body.position==='treasurer'){
    ChurchModel.findOneAndUpdate({userId:mongoose.Types.ObjectId(req.user.userId)},{"committe.treasurer":req.body.memberName},{upsert:true},(err,result)=>{
      if (err) return res.status(400).json({"Error":err})
      return res.status(200).json({"Message":"success"})
    })
  }
  else{
    ChurchModel.findOneAndUpdate({userId:mongoose.Types.ObjectId(req.user.userId)},{$push:{"committe.otherMembers":req.body.memberName}},(err,doc)=>{
      if (err) return res.status(400).json({"Error":err})
      return res.status(200).json({"Message":"success"})
    })
  }
  // const isPresent=await ChurchModel.find({"committe.president":{$exists:true}}).count()>0
  // console.log(isPresent)
})

// get committe members
router.get('/get-committee-members',middleware.athenticateToken,async(req,res,next)=>{
  // console.log(req.query)
  const doc=await ChurchModel.findOne({userId:mongoose.Types.ObjectId(req.user.userId)})
  if(!doc) return res.status(400).json({"Message":"Error"})
  let data={...doc.committe}
  res.status(200).json(data)
})

router.delete('/remove-committee-member',middleware.athenticateToken,async(req,res,next)=>{
  console.log(req.body)
  if(req.body.payload.position==='secretary'){
    ChurchModel.findOneAndUpdate({userId:mongoose.Types.ObjectId(req.user.userId)},{$unset:{"committe.secretary":1}},(err,doc)=>{
      if(err) res.status(400).json({"Error":err})
      console.log(doc)
      return res.status(200).json({"Message":"success"})
    })
  }else if(req.body.payload.position==='president'){
    ChurchModel.findOneAndUpdate({userId:mongoose.Types.ObjectId(req.user.userId)},{$unset:{"committe.president":1}},(err,doc)=>{
      if(err) res.status(400).json({"Error":err})
      console.log(doc)
      return res.status(200).json({"Message":"success"})
    })
  }else if(req.body.payload.position==='treasurer'){
    ChurchModel.findOneAndUpdate({userId:mongoose.Types.ObjectId(req.user.userId)},{$unset:{"committe.treasurer":1}},(err,doc)=>{
      console.log(doc)
      if(err) res.status(400).json({"Error":err})
      return res.status(200).json({"Message":"success"})
    })
  }else{
    ChurchModel.findOneAndUpdate({userId:mongoose.Types.ObjectId(req.user.userId)},{$pull:{"committe.otherMembers":req.body.payload.name}},(err,doc)=>{
      if (err) return res.status(400).json({"Error":err})
      console.log(doc)
      return res.status(200).json({"Message":"success"})
    })
  }
})


// Add revenue expense
router.post('/add-revenue-expense',middleware.athenticateToken,async(req,res,next)=>{
  let isRepeated=false
  const churchId=await ChurchModel.findOne({userId:mongoose.Types.ObjectId(req.user.userId)},'_id')
  const checkData=await RevenueExpenseModel.find({churchId:mongoose.Types.ObjectId(churchId)},'month year -_id')
  checkData.forEach(data=>{
    if(data.month===req.body.month&&data.year==req.body.year){
      isRepeated=true
    }
  })
  if(isRepeated){
    return res.status(401).json({"Message":"error"})
  }
  let data={...req.body,churchId:churchId}
  RevenueExpenseModel.create(data).then(()=>{
    return res.status(200).json({"Message":"Success"})
  }).catch((err)=>{
    return res.status(400).json({"Error":err})
  })
})

module.exports = router;
