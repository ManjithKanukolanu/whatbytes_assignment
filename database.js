const {Sequelize} = require("sequelize")
const sequelize = new Sequelize("hospital","postgres","Manjith@8718",{
    host:"localhost",
    dialect:"postgres"
})
sequelize.authenticate()
         .then(()=>{console.log('database connected')})
         .catch(err => console.log(err))
sequelize.sync({alter: true})
module.exports = sequelize