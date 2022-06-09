const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username : {type:String,required:true },
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    type : {type:String,required:true,enum:['student','teacher','church','admin']},
    status : {type:String,default:'Pending',enum:['Approved','Pending']}
},{collection:'Users'}
);

module.exports = mongoose.model('UserModel',UserSchema)