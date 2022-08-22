const express=require('express')
const { registerUser, login, verifyEmail }=require('../Controllers/AuthController')

const router=express.Router()

router.post('/register', registerUser)
router.post('/login', login)
router.post('/verifyemail',verifyEmail)

module.exports=router