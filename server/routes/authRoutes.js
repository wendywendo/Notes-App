const express = require('express')
const router = express.Router()
const cors = require('cors')
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController')

// Middleware
router.use(cors({
    origin: 'http://localhost:5173', //https://notes-app-59at.vercel.app
    credentials: true,
}))

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser)

module.exports = router 