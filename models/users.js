const {DataTypes} = require("sequelize")
const sequelize = require('./../database')
const User = sequelize.define("user",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    tableName:"users"
})
module.exports = User