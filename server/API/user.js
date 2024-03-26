const express = require("express");
const { verifyToken, verifyAdmin } = require("../Helpers");
const Router = express.Router();
const User = require("../models/user");

Router.route("/")
  .get(verifyToken, verifyAdmin, async (req, res) => {
    try {
      const allUsers = await User.find({ _id: { $ne: process.env.ADMIN_ID } });
      res.json({ allUsers });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal server error : " + error.message });
    }
  })

  // updating user details
  .put(verifyToken, async (req, res) => {
    try {
      const userId = req.user._id;
      const { userImageURL, userName, about } = req.body;
      const updateData = {
        userImageURL,
        userName,
        about,
      };
      await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });

      res.json({ message: "User details updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  // updating user status to active or blocked
  .patch(verifyToken, async (req, res) => {
    const { userId, status } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { status },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: " status updated successfully", updatedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

Router.route("/me").get(verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) return res.json(user);
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: `Error while finding user` });
  }
});

module.exports = Router;
