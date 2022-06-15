var express = require('express');
var router = express.Router();
const CourseModel = require('../models/courseModel')
const EventModel = require('../models/eventModel')

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

module.exports = router;
