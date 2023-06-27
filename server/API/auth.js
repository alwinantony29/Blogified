const express = require('express')
const User = require('../models/user')
const Router = express.Router()
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
Router.post("/signup", async (req, res) => {
    try {
        const { email, userID, userName, userImageURL } = req.body
        let user = await User.findOne({ email: email });
        if(user)
        console.log("user found");
        if (!user) {
            console.log("no user found");
            const _id = new mongoose.Types.ObjectId(userID);
            user = new User({ email, _id, userName, userImageURL })
            await user.save()
        }
        const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_KEY);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            console.log("decoded token" + decoded);
            res.json({ decoded });
        })
        // res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred while signing in : ' + err.message);

    }
})

module.exports = Router 
