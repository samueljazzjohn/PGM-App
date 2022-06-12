const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
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
    aadhar:{type:String,required:true},
    batch:{type:Date},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'userModel'},
    courseId:{type:mongoose.Schema.Types.ObjectId,ref:'courseModel',required:true}
},{collection:'Student'})

module.exports = mongoose.model('studentModel',studentSchema)