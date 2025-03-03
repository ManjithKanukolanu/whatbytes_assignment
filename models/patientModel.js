const {DataTypes} = require("sequelize")
const sequelize = require('./../database')
const User = require('./users')
const Patient = sequelize.define("patient",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    disease:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: User,
            key: "id"
        }
    }
},
{
    tableName:"patients"
})
module.exports = Patient