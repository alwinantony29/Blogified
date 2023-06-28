const express = require('express')
const User = require('../models/user')
const Router = express.Router()
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
Router.post("/signup", async (req, res) => {
    try {
        const { email, userID, userName, userImageURL } = req.body.credentials
        let user = await User.findOne({ email: email });
        if (user) console.log("user found");
        if (!user) {
            console.log("no user found, creating new user!");
            // const _id = new mongoose.Types.ObjectId(userID+"");
            user = new User({ email, userName, userImageURL })
            await user.save()
        }
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY);
        res.json({ token,user:{
            email:email, userName:userName,
             userImageURL:userImageURL 
        } })
    } catch (err) {
        console.log(err)
        res.status(500).send('An error occurred while signing in : ' + err.message)
    }
})

module.exports = Router 
