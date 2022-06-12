var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
const UserModel = require('../models/userModel')
const churchModel = require('../models/churchModel')
const StudentModel = require('../models/studentModel')
const TeacherModel = require('../models/teacherModel')

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
      if (err) return res.status(403).json({ 'msg': 'database error' })

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
          course: req.body.members,
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
  console.log(req.body)
  UserModel.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) return res.status(400).json({ "Message": err });
    if (doc == null) {
      return res.status(403).json({ "Message": "Email not registered" });
    }

    console.log(doc)
    if (doc.status === 'pending') {
      return res.status(402).json({ "Message": "Your account is not approved by admin" })
    }

    bcrypt.compare(req.body.password, doc.password, (err, res) => {
      if (err) return res.status(402).json({"Message":err})
      if (!res) return res.status(401).json({ "Message": "Invalid password" })
    })

    const data = {
      userId: doc._id,
      email: doc.email,
      username: doc.username,
      type: doc.type
    }
    console.log(req.body)
    res.status(202).json(data)
  })
});

module.exports = router;
