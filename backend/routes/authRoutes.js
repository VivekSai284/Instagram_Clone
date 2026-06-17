const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



router.post('/register', async(req, res) => {
    try{
        const {fullname, username, phone, password} = req.body

        const existingUser = await User.findOne({username})

        if(existingUser){
            return res.status(400).json({
                message: "User Already exists"
            })
        }


        const hashedpassword = await bcrypt.hash(password, 10)

        const user = new User({
            fullname,
            username,
            phone,
            password : hashedpassword,
        });

        await user.save()

        res.status(201).json({
            message : "User Registered Successfully"
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
});


router.post('/login', async(req, res) => {
    const {username, password} = req.body

    const user = await User.findOne({username})

    if(!user){
        return res.status(400).json({
            message: "User not exist"
        })
    }


    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(401).json({
            message : "Invalid password"
        })
    }

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )

    res.status(201).json({
        message : "Login Successful",
        token,
        user
    })
});


module.exports = router;