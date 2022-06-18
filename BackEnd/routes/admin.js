var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const CourseModel = require('../models/courseModel')
const EventModel = require('../models/eventModel')
const UserModel = require('../models/userModel')
const ChurchModel = require('../models/churchModel')
const StudentModel = require('../models/studentModel')
const TeacherModel = require('../models/teacherModel')
const nodemailer = require('nodemailer')
require('dotenv').config()

let transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

/* POST Course details. */
router.post('/add-course', async(req, res, next)=> {
  console.log(req.body)

  await CourseModel.create(req.body).then(()=>{
    res.status(200).json({'Message':'success'})
  }).catch((err)=>{
    res.status(401).json({"Message":err})
  })
});

router.delete('/remove-course',async(req,res,next)=>{
  console.log(req.query)
  await CourseModel.deleteOne({_id:req.query.id}).catch((err)=>{
    res.status(401).json({"Message":err})
  })
  res.status(201).json({"Message":"success"})
})

router.post('/add-event', async(req, res, next)=> {
  console.log(req.body)

  await EventModel.create(req.body).then(()=>{
    res.status(200).json({'Message':'success'})
  }).catch((err)=>{
    res.status(401).json({"Message":err})
  })
});

// get all event details
router.get('/event',async(req,res,next)=>{
  data=await EventModel.find()
  if(!data){
    return res.status(401).json({"Message":failed})
  }
  return res.status(200).json(data)
})

router.delete('/remove-event',async(req,res,next)=>{
  console.log(req.query)
  const data=await EventModel.deleteOne({_id:req.query.id})
  console.log(data.deletedCount)
  if(data.deletedCount==0){
    return res.status(401).json({"Message":"failed"})
  }
  res.status(201).json({"Message":"success"})
})

// Get church user details
router.get('/church-details',async(req,res,next)=>{
  data=await UserModel.find({type:"church",status:"Pending"})
  console.log(data)
  if(!data){
    return res.status(401).json({'Message':'failed'})
  }
  res.status(201).json(data)
  
})

// Get student user details
router.get('/student-details',async(req,res,next)=>{
  data=await UserModel.find({type:"student",status:"Pending"})
  console.log(data)
  if(!data){
    return res.status(401).json({'Message':'failed'})
  }
  res.status(201).json(data)
  
})

// Get teacher user details
router.get('/teacher-details',async(req,res,next)=>{
  data=await UserModel.find({type:"teacher",status:"Pending"})
  console.log(data)
  if(!data){
    return res.status(401).json({'Message':'failed'})
  }
  res.status(201).json(data)
  
})

// Get church details
router.get('/church-data',async(req,res,next)=>{
  let body={type:req.query.type,email:req.query.email}
  data=await ChurchModel.find({userId:mongoose.Types.ObjectId(req.query.id)})
  if(!data){
    return res.status(401).json({'Message':'failed'})
  }
  body={...body,data}
  console.log(body)
  res.status(201).json(body)
  
})

// Get student details
router.get('/student-data',async(req,res,next)=>{
  let body={type:req.query.type,email:req.query.email}
  data=await StudentModel.find({userId:mongoose.Types.ObjectId(req.query.id)})
  if(!data){
    return res.status(401).json({'Message':'failed'})
  }
  course=await CourseModel.find({_id:courseId})
  body={...body,data,course:course.courseName}
  console.log(body)
  res.status(201).json(body)
  
})

// Get teacher details
router.get('/teacher-data',async(req,res,next)=>{
  let body={type:req.query.type,email:req.query.email}
  data=await TeacherModel.find({userId:mongoose.Types.ObjectId(req.query.id)})
  if(!data){
    return res.status(401).json({'Message':'failed'})
  }
  body={...body,data}
  // console.log(body)
  res.status(201).json(body)
  
})

router.get('/interview-invite',async(req,res,next)=>{
  const mailOptions = {
    from: 'sender@gmail.com', // Sender address
    to: req.query.email, // List of recipients
    subject: 'Interview call', // Subject line
    text: `Dear candidate,
          we are planning to conduct an interview via zoom platform we kindly request you to join in time
      zoom link:https://us02web.zoom.us/j/71364219724?pwd=QmtFU2V3UGFmcS9aZnRkcXViWklSUT09`, // Plain text body
  };
  transport.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err)
      res.status(401).json({"Error":err})
    } else {
      res.status(201).json({"Message":"Mail send successfully"})
      // console.log(info);
    }
});
})


// Accept request
router.patch('/accept-request',async(req,res,next)=>{
  console.log(req.query)
  let doc=await UserModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.query.id)},{status:'Approved'},{new:true})
  if(!doc){
    return res.status(401).json({"Message":"Failed"})
  }
  res.status(200).json(doc)
})

// Reject requests
router.delete('/reject-request',async(req,res,next)=>{

})


module.exports = router;
