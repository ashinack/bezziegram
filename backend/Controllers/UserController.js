const UserModel=require('../Models/userModel')
const bcrypt=require('bcrypt')

//get user by id
const userData=async(req,res)=>{
    try {
        const id=req.params.id
        const user=await UserModel.findById(id)
        if(user){
            const {password,...otherdetails}=user._doc
            res.status(200).json(otherdetails)
        }else{
            res.status(404).json('no such user exist')
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message }) 
    }
}

//update a user

const updateUser=async(req,res)=>{
    const id=req.params.id
    const {currentUserId,currentUserAdminStatus,password}=req.body
    if(id===currentUserId||currentUserAdminStatus){


    try {
        if(password){
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(password,salt)
        }
        
        const user=await UserModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(user)
        
    } catch (error) {
       res.status(500).json(error);
    }
    }else{
        res.status(403).json("Access Denied ")
    }
}

//delete user

const deleteUser=async(req,res)=>{
    const id=req.params.id
    const { currentUserId, currentUserAdminStatus }=req.body
    if (currentUserId===id|| currentUserAdminStatus){
        try{
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User deleted successfully") 
        }catch(error){
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("Access Denied ")
    }
}

// //Follow a User
// const followUser=async(req,res)=>{
//     const id=req.params.id
//     const {currentUserId}=req.body
//     if(currentUserId===id)
//     {
//         res.status(403).json('Action forbidden')
//     }
// }

module.exports = { userData, updateUser, deleteUser }