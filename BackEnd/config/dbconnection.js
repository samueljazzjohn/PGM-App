var mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URI

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true },(err,db)=>{
    if(err) throw err;
    var database = mongoose.connection;
    // console.log(db.connection.collections)
    console.log('Database Created Successfully')
})