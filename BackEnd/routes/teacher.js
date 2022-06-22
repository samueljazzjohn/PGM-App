var express = require('express');
var router = express.Router();
const middleware=require('../middleware')
const NotificationModel=require('../models/notificationModel')

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

module.exports = router;
