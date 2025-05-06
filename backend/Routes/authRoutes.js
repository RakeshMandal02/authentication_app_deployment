const express = require('express')
const router = express.Router()


const { registerValidation, loginValidation } = require('../Middlewares/AuthValidation')
const { register ,login, getPendingUsers, approveUser } = require('../Controllers/AuthController')
const authenticate = require('../Middlewares/AuthMiddleware')
const isAdmin = require('../Middlewares/AdminMiddleware')

router.post('/register',registerValidation,register)
router.post('/login',loginValidation,login)

// Admin routes for approval
router.get('/pending', authenticate,isAdmin,getPendingUsers)
router.put('/approve/:id',authenticate,isAdmin,approveUser)

module.exports = router