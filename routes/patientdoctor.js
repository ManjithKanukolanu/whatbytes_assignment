const express = require('express')
const router = express.Router()
const Patient = require('./../models/patientModel')
const Doctor = require('./../models/doctorModel')
const PatientDoctor = require('./../models/patientdoctorModel')
const { Model } = require('sequelize')
PatientDoctor.belongsTo(Patient, { foreignKey: "patientid" });
PatientDoctor.belongsTo(Doctor, { foreignKey: "doctorid" });
router.post('',async(req,res)=>{
    try{
    const {patientid,doctorid} = req.body
    const patient = await Patient.findByPk(patientid)
    const doctor = await Doctor.findByPk(doctorid)
    if(!patient)
    {
        return res.status(404).json({message:"Patient Not Present"})
    }
    if(!doctor)
    {
        return res.status(404).json({message:"Doctor Not Present"})
    }
    const patientdoctor = await PatientDoctor.create({
        patientid:patientid,
        doctorid:doctorid
    })
    res.status(200).json({message:"Successfully Assigned Doctor To Patient",data:patientdoctor})
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Errror",error: err})
    }
})
router.get('',async(req,res)=>{
    try{
          const mappings = await PatientDoctor.findAll({
            include:[
                {
                    model:Patient,
                    attributes:['id','name','age']
                },
                {
                    model:Doctor,
                    attributes:['id','name','speciality']
                }
            ]
          })
          res.status(200).json({ message: "All Patient-Doctor Mappings", data: mappings })
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Errror",error: err})
    }
})
router.get('/:patientId',async (req,res)=>{
    try{
         const patientId = req.params.patientId
         const patientdoctor = await PatientDoctor.findAll({
            where:{patientid: patientId},
            include:[
            {
              model:Doctor,
              attributes:["id","name","speciality"]
            }
            ]
         })
         if(!patientdoctor)
         {
            return res.status(404).json({message:"Patient Not Found"})
         }
         res.status(200).json({message:"Data Fetched",data: patientdoctor})
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Errror",error: err})
    }
})
router.delete('/:id', async (req, res) => {
    try
    {
        const mappingId = req.params.id
        const mapping = await PatientDoctor.findByPk(mappingId)
        if (!mapping) {
            return res.status(404).json({ message: "Mapping Not Found" })
        }
        await mapping.destroy()
        res.status(200).json({ message: "Doctor removed from patient successfully" })
    } 
    catch(err)
    {
        res.status(500).json({ message: "Internal Server Error", error: err })
    }
})
module.exports = router