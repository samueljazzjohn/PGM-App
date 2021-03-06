var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
const UserModel = require('../models/userModel')
const churchModel = require('../models/churchModel')
const StudentModel = require('../models/studentModel')
const TeacherModel = require('../models/teacherModel')
const CourseModel = require('../models/courseModel')
const EventModel = require('../models/eventModel')
const DonationModel = require('../models/donationModel')
const mailSendHelper = require("../helpers/mailSendHelper")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const dotenv=require('dotenv')
const shortid = require('shortid')
const Razorpay = require('razorpay')

dotenv.config()

const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_ID,
	key_secret: process.env.RAZORPAY_SECRET
})

router.post('/razorpay', async (req, res) => {
  console.log(req.body)
	const payment_capture = 1
	const amount = req.body.amount
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,
      donator:req.body.name,
      email:req.body.email,
      phone:req.body.email
		})
	} catch (error) {
		console.log(error)
	}
})

router.post('/payment/complete',(req,res)=>{
  console.log(req.body)
  let donationDate=new Date().toString()
  donationDate=donationDate.substring(0, 10)
  const data={...req.body,donationDate}
  DonationModel.create(data).then((doc)=>{
    mailSendHelper.paymentMail(req.body.email)
    res.status(200)
  }).catch((err)=>{
    res.status(401)
  })
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello World');
});


// Registration End point
router.post('/register', (req, res, next) => {
  console.log(req.body)
  console.log('register')
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(400).json({ "msg": "User details cannot be blank" })
  }

  bcrypt.hash(req.body.password, 3, (err, hash) => {
    if (err) return res.status(401).json({ "msg": "password ecryption error" })
    const user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      type: req.body.type
    })

    user.save( async(err, doc) => {
      if (err) return res.status(403).json({ 'msg': err })

      if (req.body.type === 'church') {
        console.log('church')
        churchModel.create({
          pastorlName: req.body.lname,
          pastorfName: req.body.fname,
          members: req.body.members,
          address: {
            place: req.body.place,
            city: req.body.city,
            state: req.body.state,
            district: req.body.district,
            pincode: req.body.pincode,
            phone: req.body.phone
          },
          userId: doc._id
        }).then(()=>{
          mailSendHelper.registrationMail(req.body.email)
          return res.status(200).json({"Message":"Success"})
        }).catch( async(err)=>{
          console.log(err)
          await UserModel.deleteOne({_id:doc._id})
          return res.status(401).json({"Message":err})
        })

      }else  if (req.body.type === 'student') {

        console.log('student')
        StudentModel.create({
          fname: req.body.lname,
          lname: req.body.fname,
          courseId: req.body.course,
          aadhar:req.body.aadhar,
          address: {
            place: req.body.place,
            city: req.body.city,
            state: req.body.state,
            district: req.body.district,
            pincode: req.body.pincode,
            phone: req.body.phone
          },
          userId: doc._id
        }).then(()=>{
          mailSendHelper.registrationMail(req.body.email)
          return res.status(200).json({"Message":"Success"})
        }).catch( async(err)=>{
          console.log(err)
          await UserModel.deleteOne({_id:doc._id})
          return res.status(401).json({"Message":err})
        })

      }else{
        console.log('teacher')
        TeacherModel.create({
          fname: req.body.lname,
          lname: req.body.fname,
          experience: req.body.experience,
          aadhar:req.body.aadhar,
          address: {
            place: req.body.place,
            city: req.body.city,
            state: req.body.state,
            district: req.body.district,
            pincode: req.body.pincode,
            phone: req.body.phone
          },
          userId: doc._id
        }).then(()=>{
          mailSendHelper.registrationMail(req.body.email)
          return res.status(200).json({"Message":"Success"})
        }).catch( async(err)=>{
          console.log(err)
          await UserModel.deleteOne({_id:doc._id})
          return res.status(401).json({"Message":err})
        })
      }
    })
  })
})


// Login end point
router.post('/login', function (req, res, next) {
  console.log(req.body.password[0])
  UserModel.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) return res.status(400).json({ "Message": err });
    if (doc == null) {
      return res.status(401).json({ "Message": "Email not registered" });
    }

    console.log(doc)

    if (doc.status === 'Pending') {
      return res.status(402).json({ "Message": "Your account is not approved by admin" })
    }

    else{
      bcrypt.compare(req.body.password[0], doc.password, (err, doc) => {
        if (err) {
          console.log(err)
          return res.status(403).json({ "Message": "Server error " })
        }
        if (!doc) {
          return res.status(404).json({ "Message": "Invalid password" })
        }else{
          let data = {
            userId: doc._id,
            email: doc.email,
            username: doc.username,
            type: doc.type
          }
          const token = jwt.sign(JSON.stringify(data),process.env.JWT_SECRET_KEY);
      
          data={...data,token:token}
          // console.log(data)
          res.status(202).json(data)
        }
      })
    }
  })
});


// Get all course details
router.get('/course',async(req,res,next)=>{
  data=await CourseModel.find()
  if(!data){
    return res.status(401).json({"Message":failed})
  }
  return res.status(200).json(data)
})

// Get event details 
router.get('/events',async(req,res,next)=>{
  data=await EventModel.find().sort({date: 'desc'}).limit(3)
  console.log(data)
  if(!data){
    return res.status(401).json({"Message":failed})
  }
  return res.status(200).json(data)
})

module.exports = router;