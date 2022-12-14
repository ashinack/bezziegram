const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const config=require('./config/connection')
const dotenv=require('dotenv')
const cors=require('cors')
const cookieParser = require('cookie-parser');
const AuthRoute=require('./Routes/AuthRoute')
const AdminRoute=require('./Routes/AdminRoute')
const UserRoute=require('./Routes/UserRoute')
const PostRoute=require('./Routes/PostRoute')
const UploadRoute=require('./Routes/UploadRoute')
const MessageRoute=require('./Routes/MessageRoute')
const ChatRoute =require('./Routes/ChatRoute')

const app=express();

app.use(express.static('public'))
app.use('/images',express.static('images'))

//middleware
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())
app.use(cookieParser());




//usage of routes
app.use('/auth',AuthRoute)
app.use('/admin',AdminRoute)
app.use('/user',UserRoute)
app.use('/post',PostRoute)
app.use('/upload',UploadRoute)
app.use("/chat", ChatRoute);
MessageRoute
app.use('/message',MessageRoute)

dotenv.config()

app.listen(process.env.PORT,()=>console.log(`listening ${process.env.PORT}`))