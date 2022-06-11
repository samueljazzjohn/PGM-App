var express = require('express');
var router = express.Router();
const CourseModel = require('../models/courseModel')

/* POST Course details. */
router.post('/add-course', function(req, res, next) {
  console.log(req.body)
  const course=new CourseModel({
    courseName:req.body.courseName,
    duration:req.body.duration
  })

  course.save((err,doc)=>{
    if(err) return res.status(401).send(err)

    return res.status(200).json(doc)
  })

  res.status(400).json({'Message':'failed'})

});

module.exports = router;
