const express = require('express')
const { blogs } = require('../models/blog')
const { verifyToken, verifyAdmin } = require('../Helpers')
const Router = express.Router()
const User = require('../models/user')

Router.route("/")
    .get(verifyToken, verifyAdmin, async (req, res) => {
        try {
            const allUsers = await User.find({})
            // console.log(allUsers)
            res.json({ allUsers })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error : ' + error.message });

        }
    })

    // updating user details
    .put(verifyToken, async (req, res) => {
        try {
            const userId = req.user._id
            // console.log(req.body);
            const { userImageURL, userName, about } = req.body
            const updateData = {
                userImageURL,
                userName,
                about,
            };
            const updatedUser = await User
                .findByIdAndUpdate(userId, updateData, { new: true })

            console.log("updated user: ", updatedUser);
            res.json({ message: "user details updated succesfully" })

        } catch (error) {
            console.log("error in updating user details", error);
            res.status(500).json({ message: 'Internal server error : ' + error.message });
        }
    })

    // updating user status
    .patch(verifyToken, async (req, res) => {
        console.log("req body", req.body)
        const { userId, status } = req.body
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, { status }, { new: true })
            if (!updatedUser) {
                // The user with the provided ID was not found
                console.log("User not found");
                return res.status(404).json({ message: "User not found" });
            }
            // The user was successfully updated
            console.log("Updated user:", updatedUser);
            res.json({ message: " status updated succesfully", updatedUser })

        } catch (error) {
            console.log("Error in updating user status:", error);
            res.status(500).json({ message: 'Internal server error : ' + error.message });
        }
    })

module.exports = Router