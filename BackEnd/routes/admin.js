var express = require('express');
var router = express.Router();
const CourseModel = require('../models/courseModel')

/* POST Course details. */
router.post('/add-course', async(req, res, next)=> {
  console.log(req.body)

  await CourseModel.create(req.body).then(()=>{
    res.status(200).json({'Message':'success'})
  }).catch((err)=>{
    res.status(401).json({"Message":err})
  })
});

module.exports = router;
