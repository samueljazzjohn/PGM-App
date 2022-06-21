const mongoose = require('mongoose')

const revenueExpenseSchema = new mongoose.Schema({
    revenue:{type:Number,required:true},
    expense:{type:Number,required:true},
    month:{type:String,required:true},
    year:{type:String,required:true},
    churchId:{type:mongoose.Schema.Types.ObjectId,ref:'churchModel'}
},{collection:'RevenueExpense'})

module.exports = mongoose.model('revenueExpenseModel',revenueExpenseSchema)