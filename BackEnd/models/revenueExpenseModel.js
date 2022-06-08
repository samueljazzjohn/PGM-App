const mongoose = require('mongoose')

const revenueExpenseSchema = new mongoose.Schema({
    revenue:{type:Number,required:true},
    expense:{type:Number,required:true},
    date:{type:Date,required:true},
    churchId:{type:mongoose.Schema.Types.ObjectId,ref:'churchModel'}
},{collection:'RevenueExpense'})

module.exports = mongoose.model('revenueExpenseModel',revenueExpenseSchema)