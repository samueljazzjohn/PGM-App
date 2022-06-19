var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const CourseModel = require('../models/courseModel')
const EventModel = require('../models/eventModel')
const UserModel = require('../models/userModel')
const ChurchModel = require('../models/churchModel')
const StudentModel = require('../models/studentModel')
const TeacherModel = require('../models/teacherModel')
const nodemailer = require('nodemailer');
const mailSendHelper = require('../helpers/mailSendHelper');
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
router.post('/add-course', async (req, res, next) => {
  console.log(req.body)

  await CourseModel.create(req.body).then(() => {
    res.status(200).json({ 'Message': 'success' })
  }).catch((err) => {
    res.status(401).json({ "Message": err })
  })
});

router.delete('/remove-course', async (req, res, next) => {
  console.log(req.query)
  await CourseModel.deleteOne({ _id: req.query.id }).catch((err) => {
    res.status(401).json({ "Message": err })
  })
  res.status(201).json({ "Message": "success" })
})

router.post('/add-event', async (req, res, next) => {
  console.log(req.body)

  await EventModel.create(req.body).then(() => {
    res.status(200).json({ 'Message': 'success' })
  }).catch((err) => {
    res.status(401).json({ "Message": err })
  })
});

// get all event details
router.get('/event', async (req, res, next) => {
  data = await EventModel.find()
  if (!data) {
    return res.status(401).json({ "Message": failed })
  }
  return res.status(200).json(data)
})

router.delete('/remove-event', async (req, res, next) => {
  console.log(req.query)
  const data = await EventModel.deleteOne({ _id: req.query.id })
  console.log(data.deletedCount)
  if (data.deletedCount == 0) {
    return res.status(401).json({ "Message": "failed" })
  }
  res.status(201).json({ "Message": "success" })
})

// Get church user details
router.get('/church-details', async (req, res, next) => {
  data = await UserModel.find({ type: "church", status: "Pending" })
  console.log(data)
  if (!data) {
    return res.status(401).json({ 'Message': 'failed' })
  }
  res.status(201).json(data)

})

// Get student user details
router.get('/student-details', async (req, res, next) => {
  data = await UserModel.find({ type: "student", status: "Pending" })
  console.log(data)
  if (!data) {
    return res.status(401).json({ 'Message': 'failed' })
  }
  res.status(201).json(data)

})

// Get teacher user details
router.get('/teacher-details', async (req, res, next) => {
  data = await UserModel.find({ type: "teacher", status: "Pending" })
  console.log(data)
  if (!data) {
    return res.status(401).json({ 'Message': 'failed' })
  }
  res.status(201).json(data)

})

// get details

router.get('/details', async (req, res, next) => {
  let body = { type: req.query.type, email: req.query.email }
  if (req.query.type == 'church') {
    console.log('church')
    let data = await ChurchModel.find({ userId: mongoose.Types.ObjectId(req.query.id) })
    if (!data) {
      return res.status(401).json({ 'Message': 'failed' })
    }
    body = { ...body, data }
    console.log(body)
    return res.status(201).json(body)
  } else if (req.query.type == 'student') {
    console.log('student')
    let data = await StudentModel.find({ userId: mongoose.Types.ObjectId(req.query.id) })
    if (!data) {
      return res.status(401).json({ 'Message': 'failed' })
    }
    console.log(data[0].courseId)
    let course = await CourseModel.findOne({ _id: mongoose.Types.ObjectId(data[0].courseId) })
    console.log("course"+course.courseName)
    body = { ...body, data, course: course.courseName }
    console.log(body)
    return res.status(201).json(body)
  } else {
    console.log('teacher')
    // let body = { type: req.query.type, email: req.query.email }
    let data = await TeacherModel.find({ userId: mongoose.Types.ObjectId(req.query.id) })
    if (!data) {
      return res.status(401).json({ 'Message': 'failed' })
    }
    body = { ...body, data }
    // console.log(body)
    res.status(201).json(body)
  }
})

router.get('/interview-invite', async (req, res, next) => {
  const mailOptions = {
    from: 'sender@gmail.com', // Sender address
    to: req.query.email, // List of recipients
    subject: 'Interview call', // Subject line
    text: `Dear candidate,
          we are planning to conduct an interview via zoom platform we kindly request you to join in time
      zoom link:https://us02web.zoom.us/j/71364219724?pwd=QmtFU2V3UGFmcS9aZnRkcXViWklSUT09`, // Plain text body
  };
  transport.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
      res.status(401).json({ "Error": err })
    } else {
      res.status(201).json({ "Message": "Mail send successfully" })
      // console.log(info);
    }
  });
})


// Accept request
router.patch('/accept-request', async (req, res, next) => {
  console.log(req.body)
  let doc = await UserModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.id) }, { status: 'Approved' }, { new: true })
  if (!doc) {
    return res.status(401).json({ "Message": "Failed" })
  }
  mailSendHelper.acceptedMail(doc.email,doc.username,req.body.id)
  return res.status(201).json({"Message":"Success"})
})

// Reject requests
router.delete('/reject-request', async (req, res, next) => {
  console.log(req.query)
  if(req.query=='student'){
    let delStudent=await StudentModel.deleteOne({userId:req.query.id})
    if (delStudent.deletedCount == 0) {
      return res.status(401).json({ "Message": "failed" })
    }
    let delUser=await UserModel.deleteOne({_id:req.query.id})
    if (delUser.deletedCount == 0) {
      return res.status(401).json({ "Message": "failed" })
    }
    return res.status(201).json({"Message":"Succes"})
  }else if(req.query=='teacher'){
    let delTeacher=await TeacherModel.deleteOne({userId:req.query.id})
    if (delTeacher.deletedCount == 0) {
      return res.status(401).json({ "Message": "failed" })
    }
    let delUser=await UserModel.deleteOne({_id:req.query.id})
    if (delUser.deletedCount == 0) {
      return res.status(401).json({ "Message": "failed" })
    }
    return res.status(201).json({"Message":"Succes"})
  }else{
    let delChurch=await ChurchModel.deleteOne({userId:req.query.id})
    if (delChurch.deletedCount == 0) {
      return res.status(401).json({ "Message": "failed" })
    }
    let delUser=await UserModel.deleteOne({_id:req.query.id})
    if (delUser.deletedCount == 0) {
      return res.status(401).json({ "Message": "failed" })
    }
    return res.status(201).json({"Message":"Succes"})
  }
})


module.exports = router;
