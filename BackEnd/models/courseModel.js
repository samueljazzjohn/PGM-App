const mongoose = require('mongoose')

const courseModel = new mongoose.Schema({
    courseName:{type:String,required:true,unique:true},
    duration:{type:Number,required:true}
},{collection:'Course'})

module.exports = mongoose.model('courseModel',courseModel)