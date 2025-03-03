const {DataTypes} = require("sequelize")
const sequelize = require('./../database')
const User = require('./users')
const Doctor = sequelize.define("doctor",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    speciality:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    tableName:"doctors"
})
module.exports = Doctor