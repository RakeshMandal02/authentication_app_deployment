const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config({ path: './Config/.env' })
require("./Config/db")

const authRoutes = require('./Routes/authRoutes')
app.use(cors())
app.use(bodyParser.json())
app.use('/api/auth', authRoutes)

app.get('/ping',(req,res)=>{
    res.send('PONG')
})

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    
});