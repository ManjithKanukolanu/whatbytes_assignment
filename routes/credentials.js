const express = require('express')
const User = require('./../models/users')
const jwt = require('jsonwebtoken')
const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET
router.post('/register',async (req,res)=>{
    try{
    const {name,email,password} = req.body
    const existinguser = await User.findOne({where: {email}})
    if(existinguser)
    {
        return res.status(400).json({message: "Email Already Exists"})
    }
    const newuser = await User.create({
        name,email,password
    })
    res.status(201).json({message:"User Registered Successfully",user: newuser})
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Errror",error: err})
    }
})
router.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body
        const existinguser = await User.findOne({where: {email}})
        if(!existinguser)
        {
            return res.status(400).json({message: "User Not Found. Please Register First"})
        }
        if(existinguser.password !== password)
        {
            return res.status(401).json({message: "Invalid Password"})
        }
        const token = jwt.sign({id:existinguser.id,email:existinguser.email},JWT_SECRET,{expiresIn:"1h"})
        res.status(200).json({message:"Login Successful",email:existinguser.email,password:existinguser.password,token:token})
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Error",error: err})
    }
})
module.exports = router