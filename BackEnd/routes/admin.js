var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const CourseModel = require('../models/courseModel')
const EventModel = require('../models/eventModel')
const UserModel = require('../models/userModel')
const ChurchModel = require('../models/churchModel')

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

// Get church details
router.get('/church-details',async(req,res,next)=>{
  data=await UserModel.find({type:"church",status:"Pending"})
  console.log(data)
  if(!data){
    return res.status(401).json({'Message':'failed'})
  }
  res.status(201).json(data)
  
})

// Get student details
router.get('/student-details',async(req,res,next)=>{
  data=await UserModel.find({type:"student",status:"Pending"})
  console.log(data)
  if(!data){
    return res.status(401).json({'Message':'failed'})
  }
  res.status(201).json(data)
  
})

// Get teacher details
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
  let data={type:req.query.type}
  church=await ChurchModel.find({userId:mongoose.Types.ObjectId(req.query.id)})
  if(!church){
    return res.status(401).json({'Message':'failed'})
  }
  data={...data,church}
  console.log(data)
  res.status(201).json(data)
  
})


module.exports = router;
