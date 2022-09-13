const express = require('express')
const { Adminlogin } = require('../Controllers/AdminController')

const router = express.Router()

router.post('/', Adminlogin)


module.exports = router