const mongoose = require('mongoose')

const memberSchema =new mongoose.Schema({
    memberName:{type:String,required:true},
    isBaptized:{type:Boolean,required:true},
    baptizedDate:Date,
    address:{
        place:String,
        district:String,
        city:String,
        state:String,
        pincode:String,
        phone:String,
    },
    churchId:{type:mongoose.Schema.Types.ObjectId,ref:'churchModel'}
},{collection:'Members'}
);

module.exports = mongoose.model('memberModel',memberSchema)