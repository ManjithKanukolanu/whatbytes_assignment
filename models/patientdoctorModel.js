const {DataTypes} = require("sequelize")
const sequelize = require('./../database')
const Patient = require('./patientModel')
const Doctor = require('./doctorModel')
const PatientDoctor = sequelize.define("patientdoctors",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    patientid:{
        type:DataTypes.INTEGER,
        references:{
              model:Patient,
              key:"id"
        },
        allowNull:false
    },
    doctorid:{
        type:DataTypes.INTEGER,
        references:{
            model:Doctor,
            key:"id"
        },
        allowNull:false
    }
},
{
    tableName:"patientdoctors"
})
Patient.belongsToMany(Doctor,{through:PatientDoctor,foreignKey:"patientid"})
Doctor.belongsToMany(Patient,{through:PatientDoctor,foreignKey:"doctorid"})
module.exports = PatientDoctor