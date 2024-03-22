const express = require('express')
const User = require('../models/user')
const Router = express.Router()
const jwt = require('jsonwebtoken'); 
const { verifyToken } = require('../Helpers')

Router.post("/signup", async (req, res) => {
    try {
        const { email, userName, userImageURL } = req.body.credentials
        let user = await User.findOne({ email: email });
        if (user) {
            console.log("user found");
            if (user.status === "blocked") {
                console.log("user is blocked");
                return res.status(423).json({ message: "User is blocked" })
            }
        } else {
            user = new User({ email, userName, userImageURL })
            await user.save()
        }
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY);
        res.json({
            token, user: { email, userName, userImageURL }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('An error occurred while signing in : ' + err.message)
    }
})

module.exports = Router 
