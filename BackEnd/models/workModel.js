const mongoose = require('mongoose')

const workSchema = new mongoose.Schema({
    question:{type:String,required:true},
    answers:{
        answer:String,
        studentId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'studentModel'
        }
    },
    courseId:{type:mongoose.Schema.Types.ObjectId, ref:'courseModel'}
},{collection:'Work'})

module.exports = mongoose.model('workModel',workSchema)