const UserModel = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const Adminlogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email: email, isAdmin:true})
       
        if (user) {
            const validity = await bcrypt.compare(password, user.password)
            if (!validity) {
                res.status(400).json("wrong password")
            } else {
                const token = jwt.sign({
                    email: user.email, id: user._id
                }, process.env.JWT_KEY, { expiresIn: '1h' })
                res.status(200).json({ user, token })
            }


        }
        else {
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
        res.status(500).json({ message: error.message })
    }
}

module.exports = { Adminlogin }