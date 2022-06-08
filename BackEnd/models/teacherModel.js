const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    photo:String,
    address:{
        place:String,
        district:String,
        city:String,
        state:String,
        pincode:String,
        phone:String,
    },
    experience:{type:Number,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'userModel'}
},{collection:'Teacher'})

module.exports = mongoose.model('teacherModel',teacherSchema)