const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
const authenticateToken = (req,res,next)=>{
    const token = req.header("Authorization")?.split(" ")[1]
    if(!token)
    {
       return res.status(403).json({message: "Access Denied. No Token Provided."})
    }
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if(err)
        {
           return res.status(401).json({message: "Invalid Token."})
        }
        console.log(decoded)
        req.user = decoded
        next()
    })
}
module.exports = authenticateToken