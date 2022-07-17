const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
    donator:{type:String,required:true},
    amount:{type:Number,required:true},
    donationDate:{type:Date,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true}
},{collection:'Donation'})

module.exports = mongoose.model('donationModel',donationSchema)