const express = require('express')
const router = express.Router()
const Patient = require('./../models/patientModel')
const authenticateToken = require('./../autheticate')
router.post('',authenticateToken,async (req,res)=>{
    try{
          const {name,age,disease} = req.body
          const userId = req.user.id
          const newpatient = await Patient.create({
            name,age,disease,userId
          })
          res.status(201).json({message:"Successfully Added Patient",user:newpatient})
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Errror",error: err})
    }
})
router.get('',async (req,res)=>{
    try{
         const patients = await Patient.findAll({where: {userId:req.user.id}})
         if(patients.length === 0)
         {
            return res.status(200).json({message:"No Patients For This User"})
         }
         res.status(200).json({message:"Patients Data Fetched",data: patients})
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Errror",error: err})
    }
})
router.get('/:id',async (req,res)=>{
    try{
        const patientId = req.params.id
        const patient = await Patient.findByPk(patientId)
        if(!patient)
        {
            return res.status(404).json({message:"Patient Is Not Present"})
        }
        res.status(200).json({message:"Patients Data Fetched",data: patient})
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Errror",error: err})
    }
})
router.put('/:id',authenticateToken,async (req,res)=>{
    try{
        const {name,age,disease} = req.body
        const patientId = req.params.id
        const patient = await Patient.findByPk(patientId)
        if(!patient)
        {
            return res.status(404).json({message:"Patient Is Not Present"})
        }
        await patient.update({
            name:name ?? patient.name,
            age:age ?? patient.age,
            disease:disease ?? patient.disease
        })
        res.status(200).json({message:"Patients Details Updated",data: patient})
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Errror",error: err})
    }
})
router.delete('/:id',authenticateToken,async (req,res)=>{
    try{
        const patientId = req.params.id
        const patient = await Patient.findByPk(patientId)
        if(!patient)
        {
            return res.status(404).json({message:"Patient Is Not Present"})
        }
        await Patient.destroy({where :{id: patientId}})
        res.status(200).json({message:"Successfully Patient Record Deleted",data: patient})
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Errror",error: err})
    }
})
module.exports = router