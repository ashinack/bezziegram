const express=require('express')
// const {authMiddleWare}=require('../middleware/autMiddleWare')
const { userData, updateUser, deleteUser, followUser, unfollowUser, getAllUsers }=require('../Controllers/UserController')

const router = express.Router();

router.get('/',getAllUsers)
router.get('/:id',userData)
router.put('/:id',updateUser)
router.delete('/:id',  deleteUser)
router.put('/:id/follow',followUser)
router.put('/:id/unfollow', unfollowUser)
module.exports=router;