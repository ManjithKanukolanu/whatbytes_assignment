const express = require('express')
const router = express.Router()
const Doctor = require('./../models/doctorModel')
const authenticateToken = require('./../autheticate')
router.post('',authenticateToken,async (req,res)=>{
    try{
          const {name,age,speciality} = req.body
          const userId = req.user.id
          const newdoctor = await Doctor.create({
            name,age,speciality,userId
          })
          res.status(201).json({message:"Successfully Added Doctor",user:newdoctor})
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Errror",error: err})
    }
})
router.get('',async (req,res)=>{
    try{
         const doctors = await Doctor.findAll()
         if(doctors.length === 0)
         {
            return res.status(200).json({message:"No Doctors For This User"})
         }
         res.status(200).json({message:"Doctors Data Fetched",data: doctors})
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Errror",error: err})
    }
})
router.get('/:id',async (req,res)=>{
    try{
        const doctorId = req.params.id
        const doctor = await Doctor.findByPk(doctorId)
        if(!doctor)
        {
            return res.status(404).json({message:"Doctor Is Not Present"})
        }
        res.status(200).json({message:"Doctors Data Fetched",data: doctor})
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Errror",error: err})
    }
})
router.put('/:id',authenticateToken,async (req,res)=>{
    try{
        const {name,age,speciality} = req.body
        const doctorId = req.params.id
        const doctor = await Doctor.findByPk(doctorId)
        if(!doctor)
        {
            return res.status(404).json({message:"Doctor Is Not Present"})
        }
        await doctor.update({
            name:name ?? doctor.name,
            age:age ?? doctor.age,
            speciality:speciality ?? doctor.speciality
        })
        res.status(200).json({message:"Doctors Details Updated",data: doctor})
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Errror",error: err})
    }
})
router.delete('/:id',authenticateToken,async (req,res)=>{
    try{
        const doctorId = req.params.id
        const doctor = await Doctor.findByPk(doctorId)
        if(!doctor)
        {
            return res.status(404).json({message:"Doctor Is Not Present"})
        }
        await Patient.destroy({where :{id: doctorId}})
        res.status(200).json({message:"Successfully Doctor Record Deleted",data: doctor})
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Errror",error: err})
    }
})
module.exports = router