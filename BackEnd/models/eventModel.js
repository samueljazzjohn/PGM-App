const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name:{type:String,required:true},
    date:{type:Date,required:true},
    place:{type:Date,required:true}
},{collection:'Event'})

module.exports = mongoose.model('eventModel',eventSchema)