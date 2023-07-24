const express = require('express')
const { blogs } = require('../models/blog')
const { verifyToken, verifyAdmin } = require('../Helpers')
const Router = express.Router()
const User = require('../models/user')

Router.route("/")
    .get(verifyToken, verifyAdmin, async (req, res) => {
        try {
            const allusers = await User.find({})
            console.log(allusers);
            res.json({ allusers })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'An error occurred while fetching users : ' + error.message });

        }
    })

    // updating user details
    .put(verifyToken, async (req, res) => {
        try {
            const userId = req.user._id
            console.log(req.body);
            const { userImageURL, userName, about } = req.body
            const updateData = {
                userImageURL,
                userName,
                about,
            };
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
            console.log(updatedUser);
            res.json({ message: "user details updated succesfully" })

        } catch (error) {
            console.log("error in updating user details", error);
            res.status(500).json({ message: 'An error occurred while updating users details : ' + error.message });
        }
    })

    // updating user status
    .patch(verifyToken, async (req, res) => {
        console.log(req.body);
        const { userId, status } = req.body
        try {
            const result = await User.findByIdAndUpdate(userId, { status }, { new: true })
            res.json({ message: "user status updated succesfully" })
            console.log("updated user: ", result);
        } catch (error) {
            console.log("Error in updating user status:", error);
            res.status(500).json({ message: 'An error occurred while updating users status : ' + error.message });
        }
    })

module.exports = Router