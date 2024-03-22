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
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });

      console.log("updated user: ", updatedUser);
      res.json({ message: "user details updated succesfully" });
    } catch (error) {
      console.log("error in updating user details", error);
      res
        .status(500)
        .json({ message: "Internal server error : " + error.message });
    }
  })

  // updating user status to active or blocked
  .patch(verifyToken, async (req, res) => {
    console.log("req body", req.body);
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
      // The user was successfully updated
      console.log("Updated user:", updatedUser);
      res.json({ message: " status updated successfully", updatedUser });
    } catch (error) {
      console.log("Error in updating user status:", error);
      res
        .status(500)
        .json({ message: "Internal server error : " + error.message });
    }
  });

Router.route("/me").get(verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) return res.json({ user });
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: `Error while finding user` });
  }
});

module.exports = Router;
