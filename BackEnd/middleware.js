// const jwt = require('jsonwebtoken');

// let authenticateToken = (req, res, next) => {
//     console.log("______________inside jwt",req)
//     let token =req.headers['Authorization'].split(' ')[1];
//     // let token = req.headers.authorization.split(' ')[1];
//     // let token=req.headers('Authorization');
//     console.log("__________________",token)
//     console.log("_______________key",process.env.JWT_SECRET_KEY)
//     if(!token){
//         return res.status(403).send("A token is required for authentication");
//     }
//     // token = token.split(7,token.length)

//     if (token == null) return res.sendStatus(401)
//     try{
//         if(token){
//             jwt.verify(token, process.env.JWT_SECRET_KEY, (err,user) => {
//                 if (err) {
//                     console.log(err)
//                     return res.sendStatus(403)
//                 } 
//                 console.log(JSON.stringify(user))
//                 req.user = user
//             })
//         }
//     }catch (err) {
//         return res.status(401).send("Invalid Token");
//     }
    
//     next();
// }

const jwt = require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config()

function authenticateToken(req, res, next) {
    // console.log(req.headers)
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET_KEY , (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

module.exports = {'athenticateToken':authenticateToken}