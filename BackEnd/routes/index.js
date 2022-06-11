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

        const church = new churchModel({
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
        })
    
        church.save((err, doc) => {
          if (err) return res.status(403).json({ 'msg': 'database error' })
          console.log(doc)
          return  res.status(201).json({ "Message": "success" })
        })
        await UserModel.deleteOne({_id:doc._id})

      }else  if (req.body.type === 'student') {

        const student = new StudentModel({
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
        })
    
        student.save((err, doc) => {
          if (err) return res.status(403).json({ 'msg': 'database error' })
          console.log(doc)
          return  res.status(201).json({ "Message": "success" })
        })
        await UserModel.deleteOne({_id:doc._id})
      }else{
        const teacher = new TeacherModel({
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
        })
    
        teacher.save((err, doc) => {
          if (err) return res.status(403).json({ 'msg': 'database error' })
          console.log(doc)
          return  res.status(201).json({ "Message": "success" })
        })
        await UserModel.deleteOne({_id:doc._id})
      }
    })
  })
  return res.status(403).json({'Message':'Failed'})

})

router.post('/login', function (req, res, next) {
  console.log(req.body)
  UserModel.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) return res.status(500).json({ "msg": err });
    if (doc == null) {
      return res.status(403).json({ "msg": "Email not registered" });
    }

    console.log(doc)
    if (doc.status === 'pending') {
      return res.status(402).json({ "msg": "Your account is not approved by admin" })
    }

    bcrypt.compare(req.body.password, doc.password, (err, res) => {
      if (err) return res.status(400).json(err)
      if (!res) return res.status(401).json({ "msg": "Invalid password" })
    })
    // console.log(validatePassword)

    // if(!validPassword){
    //   return res.status(400).json({"msg":"Invalid password"})
    // }

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
