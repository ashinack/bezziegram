const express=require('express')
const { userData, updateUser, deleteUser }=require('../Controllers/UserController')

const router = express.Router();

router.get('/:id',userData)
router.put('/:id',updateUser)
router.delete('/:id', deleteUser)

module.exports=router;