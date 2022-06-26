var express = require('express');
var router = express.Router();
const middleware=require('../middleware')
const NotificationModel=require('../models/notificationModel')
const WorkModel = require('../models/workModel')
const UserModel = require('../models/userModel')
const StudentModel = require('../models/studentModel')
const CourseModel = require('../models/courseModel')
const mongoose = require('mongoose')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add-notification',middleware.athenticateToken,async(req,res,next)=>{
  console.log(req.body)
  const date=req.body.date.substring(0,10)
  req.body.date=date
  NotificationModel.create(req.body).then(()=>{
    res.status(200).json({"Message":"Success"})
  }).catch((err)=>{
    res.status(400).json({"Error":err})
  })
})


// Get approved student details
router.get('/full-student-details', middleware.athenticateToken, async (req, res, next) => {
  let userIds = []
  await UserModel.find({ type: "student", status: "Approved" }, '_id').then(async(doc) => {
    userIds = doc.map((item) => item._id)
    console.log(userIds)
  }).catch((err) => {
    return res.status(400).json({ "Error": err })
  })

  let data = []
  for (var i = 0; i < userIds.length; i++) {
    let temp = {}
    await StudentModel.findOne({ userId: mongoose.Types.ObjectId(userIds[i]) }).then(async (doc) => {
      // console.log(doc)
      temp = { ...doc._doc }
      await CourseModel.findOne({ _id: mongoose.Types.ObjectId(doc.courseId) }).then((doc) => {
        temp = { ...temp, course: doc.courseName }
      })
      console.log(temp)
    }).catch((err) => {
      return res.status(400).json({ "Error": err })
    })
    data.push(temp)
  }
  // console.log("______")
  // console.log(data)
  res.status(200).json(data)
})

// Assign works
router.post('/assign-works',middleware.athenticateToken,async(req,res,next)=>{
  console.log(req.body)
  const date=req.body.date.substring(0,10)
  let data={batch:req.body.year,question:req.body.question,courseId:req.body.course,date:date,teacherId:mongoose.Types.ObjectId(req.user.userId)}
  WorkModel.create(data).then((doc)=>{
    res.status(200).json({"Message":"Success"})
  }).catch((err)=>{
    res.status(400).json({"Error":"Error"})
  })
})

// Get all works
router.get('/view-works',middleware.athenticateToken,async(req,res,next)=>{
  WorkModel.find({teacherId:mongoose.Types.ObjectId(req.user.userId)}).populate('courseId').then((doc)=>{
    res.status(200).json(doc)
  }).catch((err)=>{
    res.status(401).json({"Error":"error"})
  })
})

// Delete work
router.delete('/remove-work',middleware.athenticateToken,async(req,res,next)=>{
  WorkModel.deleteOne({_id:mongoose.Types.ObjectId(req.body.id)}).then(()=>{
    res.status(200).json({"Message":"Success"})
  }).catch((err)=>{
    res.status(400).json({"Error":err})
  })
})



module.exports = router;
