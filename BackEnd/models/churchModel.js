const mongoose = require('mongoose')

const churchSchema = new mongoose.Schema({
    pastorfName:{type:String,required:true},
    pastorlName:{type:String,required:true},
    members:{type:Number,require:true},
    committe:{
        president:String,
        secretary:String,
        treasurer:String,
        otherMembers:[String],
    },
    address:{
        place:String,
        district:String,
        city:String,
        state:String,
        pincode:String,
        phone:String,
    },
    pastorImage:String,
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'userModel'}
},{collection:'Churches'});


module.exports = mongoose.model('churchModel',churchSchema)