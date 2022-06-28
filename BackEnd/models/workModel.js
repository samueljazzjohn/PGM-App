const mongoose = require('mongoose')

const workSchema = new mongoose.Schema({
    question:{type:String,required:true},
    batch:{type:String,required:true},
    deadline:{type:String,required:true},
    answers:[{
        url:String,
        submission:String,
        studentId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'studentModel'
        }
    }],
    teacherId:{type:mongoose.Schema.Types.ObjectId, ref:'teacherModel',required:true},
    courseId:{type:mongoose.Schema.Types.ObjectId, ref:'courseModel',required:true}
},{collection:'Work'})

module.exports = mongoose.model('workModel',workSchema)