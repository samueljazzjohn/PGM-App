const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    title:{type:String,required:true},
    message:{type:String,required:true},
    date:{type:String,required:true},
},{collection:'Notification'})

module.exports = mongoose.model('notificationModel',notificationSchema)