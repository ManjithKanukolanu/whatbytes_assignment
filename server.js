const express = require('express')
const pool = require('./database')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
const PORT = process.env.port
app.listen(PORT,()=>{
    console.log(`listens on port ${PORT}`)
})
app.get('/',(req,res)=>{
    res.send('welcome everyone')
})
app.use('/api/auth',require('./routes/credentials'))
app.use('/api/patients',require('./routes/patient'))
app.use('/api/doctors',require('./routes/doctor'))
app.use('/api/mappings',require('./routes/patientdoctor'))