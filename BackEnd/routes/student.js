var express = require('express');
var router = express.Router();
const NotificationModel = require('../models/notificationModel')
const middleware = require('../middleware')
const mongoose = require('mongoose')
const UserModel = require('../models/userModel')
const StudentModel = require('../models/studentModel')
const WorkModel = require('../models/workModel')

/* GET notification */
router.get('/view-notification', function(req, res, next) {
  NotificationModel.find({}).then((doc)=>{
    res.status(200).json(doc)
  }).catch((err)=>{
    res.status(400).json({"Error":err})
  })
});

// Get all works
router.get('/view-works',middleware.athenticateToken,async(req,res,next)=>{
  console.log(req.user)
  let details=await StudentModel.findOne({userId:mongoose.Types.ObjectId(req.user.userId)})
  console.log(details)
  if(!details){
    return res.status(400).json({"Message":"Error"})
  }
  WorkModel.find({batch:details.batch,courseId:details.courseId}).then((doc)=>{
    res.status(200).json(doc)
  }).catch((err)=>{
    res.status(400).json({"Error":err})
  })
})

// Upload Work
router.post('/upload-work',middleware.athenticateToken,async(req,res,next)=>{
  console.log(req.body)
  let data={url:req.body.upload,studentId:req.body.id}
  WorkModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.id) }, { answers: data }, { upsert: true }).then((doc)=>{
    console.log(doc)
    res.status(200).json({"Message":"Success"})
  }).catch((err)=>{
    res.status(400).json({"Error":err})
  })
})

module.exports = router;