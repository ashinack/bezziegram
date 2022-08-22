const mongoose=require('mongoose')
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    verified:{
        type:Boolean,
        default:false,
        required:true,
    },
    profilePicture:String,
    coverPicture:String,
    about:String,
    Livesin:String,
    workAt:String,
    relationship:String ,
    followers:[],
    following:[]
},
{
    timestamps:true
}
)
const UserModel = mongoose.model('Users', UserSchema)
module.exports = UserModel ;