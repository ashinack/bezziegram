const UserModel = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//get all users
const getAllUsers=async(req,res)=>{
    try {
        let users=await UserModel.find({isAdmin:"false"});
        users=users.map((user)=>{
            const {password,...otherDetails}=user._doc
            return otherDetails
        })
        res.status(200).json(users)
    } catch (error) {
       res.status(500).json(error) 
    }

}

//get user by id
const userData = async (req, res) => {
    try {
        const id = req.params.id
        const user = await UserModel.findById(id)
        if (user) {
            const { password, ...otherdetails } = user._doc
            res.status(200).json(otherdetails)
        } else {
            res.status(404).json('no such user exist')
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//update a user

const updateUser = async (req, res) => {
    const id = req.params.id
    const { _id, currentUserAdminStatus, password } = req.body
    if (id === _id) {

console.log(_id);
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt)
            }

            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })
            const token = jwt.sign(
                { email: user.email, id: user._id },
                process.env.JWT_KEY, { expiresIn: "1h" }
            )
            res.status(200).json({user, token})

        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("Access Denied ")
    }
}

//delete user

const deleteUser = async (req, res) => {
    const id = req.params.id
    const { currentUserId, currentUserAdminStatus } = req.body
    if (currentUserId === id || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User deleted successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Access Denied ")
    }
}

//Follow a User
const followUser = async (req, res) => {
    const id = req.params.id
    const { _id } = req.body
   
    if (_id === id) {
        res.status(403).json('Action forbidden')
        
    }
    else {
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(_id)
            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: { followers: _id} })
                await followingUser.updateOne({ $push: { following: id } })
                res.status(200).json("User followed")
            } else {
                res.status(200).json("User is already followed")
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}

//unFollow a User
const unfollowUser = async (req, res) => {
    const id = req.params.id
    const {_id} = req.body
    if (_id === id) {
        res.status(403).json('Action forbidden')
    }
    else {
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(_id)
            if (followUser.followers.includes(_id)) {
                await followUser.updateOne({ $pull: { followers: _id } })
                await followingUser.updateOne({ $pull: { following:id } })
                res.status(200).json("User unfollowed")
            } else {
                res.status(200).json("User is not followed")
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}

// //follow user profile
// const followUserProfile=async (req,res)=>{
//     const userId=req.params.id
//     try {
//         const followuserprofile=await UserModel.find({_id:userId})
//         res.status(200).json(followuserprofile)
//     } catch (error) {
//         res.status(500).json(error)
        
//     } 

// }

module.exports = { userData, updateUser, deleteUser, followUser, unfollowUser, getAllUsers}