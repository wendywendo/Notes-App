const express = require('express')
const User = require('../models/User')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')
 
const test = (req, res) => {
    res.json("Test is working!")
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check password validity
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password must be at least 6 characters long'
            })
        }

        // Check that email is unique
        const exist = await User.findOne({ email })
        if (exist) {
            return res.json({
                error: 'Email already exists'
            })
        }

        const hashedPassword = await hashPassword(password)
        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.json(user);

    } catch (error) {
        console.log(error)
    }
}


const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                error: 'User not found!'
            })
        }

        // Check if passwords match
        const match = await comparePassword(password, user.password)

        if (match) {

            jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true
                }).json(user)
            })
            
        } else {
            return res.status(401).json({
                error: 'Password incorrect'
            })
        }


    } catch (error) {
        console.log(error)
    }

}

const getProfile = (req, res) => {
    const { token } = req.cookies

    if (token) {
        
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err

            res.json(user)
        })

    } else {
        res.json(null)
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out successfully!' })
}


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}