const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventName:{type:String,required:true},
    date:{type:String,required:true},
    venue:{type:String,required:true}
},{collection:'Event'})

module.exports = mongoose.model('eventModel',eventSchema)