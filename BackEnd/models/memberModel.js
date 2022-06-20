const mongoose = require('mongoose')

const memberSchema =new mongoose.Schema({
    memberName:{type:String,required:true},
    isBaptized:{type:String,required:true,enum:['Yes','No']},
    baptizedDate:Date,
    phone:{type:String,required:true},
    maritalStatus:{type:String,required:true,enum:['Single','Married']},
    churchId:{type:mongoose.Schema.Types.ObjectId,ref:'churchModel'}
},{collection:'Members'}
);

module.exports = mongoose.model('memberModel',memberSchema)