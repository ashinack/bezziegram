const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const config=require('./config/connection')
const dotenv=require('dotenv')
const cors=require('cors')
const AuthRoute=require('./Routes/AuthRoute')
const UserRoute=require('./Routes/UserRoute')

const app=express();

//middleware
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())

//usage of routes
app.use('/auth',AuthRoute)
app.use('/user',UserRoute)

dotenv.config()

app.listen(process.env.PORT,()=>console.log(`listening ${process.env.PORT}`))