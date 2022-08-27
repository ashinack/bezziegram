const UserModel=require('../Models/userModel')
const VerificationToken=require("../Models/token")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { generateOTP, mailTransport } = require('../utils/mail')

const { sendError } = require('../utils/helper')
const { isValidObjectId } = require('mongoose')
const token = require('../Models/token')

const registerUser=async(req,res)=>{
    
     
    const salt=await bcrypt.genSalt(10)
    const hashedPass=await bcrypt.hash(req.body.password,salt)
    req.body.password=hashedPass
    const newUser = new UserModel(req.body)
    const {email}=req.body
    try{
        
        const oldUser=await UserModel.findOne({email})
        if(oldUser){
            return res.status(400).json({message:"username is already registered"})
        }
       
       
        
         const user=await newUser.save()
         console.log(user);
        const OTP = generateOTP()
        const verificationToken = new VerificationToken({
            owner: user._id,
            emailtoken: OTP
        })
        const emailToken = await verificationToken.save();
        console.log(emailToken);

        mailTransport().sendMail({
            from:'fashionhu321@gmail.com',
           to:user.email,
           subject:'verify your email account',
           html:`<h1>${OTP}</h1>`
        })

        
        
         const token=jwt.sign({
            email:user.email,id:user._id
         }, process.env.JWT_KEY,{expiresIn:'1h'})
        res.status(200).json({user,token})
    }catch(error){
        res.status(500).json({message:'fill all fields'})    
    }

}



const login=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email:email})
        if(user){
            const validity=await bcrypt.compare(password,user.password)
            if(!validity){
                res.status(400).json("wrong password")
            }else{
                const token = jwt.sign({
                    email: user.email, id: user._id
                }, process.env.JWT_KEY, { expiresIn: '1h' })
                res.status(200).json({user, token }) 
            }


        }
        else{
            res.status(404).json('user does not exist')
        }
        // if(!user.verified){
        //     let emailtoken=await Token.findOne({userId:user.id})
        //     if(!emailtoken){
        //         emailtoken = await new Token({
        //             userId: user._id,
        //             token: crypto.randomBytes(32).toString("hex")
        //         }).save()
        //     }
        //     return res.status(400).send({message:"mail sended"})
        // }
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}

const verifyEmail=async(req,res)=>{
    const {otp,userId}=req.body
    console.log(userId);
    console.log(otp);
    // if(!userId||otp.trim()) return sendError(res,'invalid request,missing parameters!')
    // if (!isValidObjectId()) return sendError(res, 'invalid user id!')
    const user=await UserModel.findById(userId)
    console.log(user);
    if (!user) return sendError(res, 'Sorry,user not found')

    if (user.verified) return sendError(res, 'this account is already verified');

    const emailtoken=await VerificationToken.findOne({owner:user._id})
    if (!emailtoken) return sendError(res, 'sorry, user not found!');

    const isMatched=await emailtoken.compareToken(otp)
    if (!isMatched) return sendError(res, 'please provide a valid token')

    user.verified =true;

    await VerificationToken.findByIdAndDelete(emailtoken._id)
    await user.save()

    mailTransport().sendMail({
        from: 'fashionhu321@gmail.com',
        to: user.email,
        subject: 'verify your email account',
        html: `<h1>${'email verified successfully'}</h1>`
    })
    res.json({success:true,message:"your email is verified"})

}

module.exports = { registerUser, login,verifyEmail }

