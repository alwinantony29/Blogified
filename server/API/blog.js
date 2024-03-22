const express = require("express");
const { blogs } = require("../models/blog");
const { verifyToken } = require("../Helpers");
const Router = express.Router();

//////////////   Get 10 blogs written by current signed in user and total count
//////////////   query : page

Router.get("/myblogs", verifyToken, async (req, res) => {
  const page = req.query.page || 1;
  try {
    const result = await blogs
      .find({ authorID: req.user._id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * 10)
      .limit(10)
      .exec();
    const totalDocuments = await blogs.countDocuments({
      authorID: req.user._id,
    });
    if (totalDocuments === 0) {
      // when the user has no blogs
      return res
        .status(404)
        .json({ message: "You haven't written any blogs." });
    }
    res.json({ result, totalDocuments });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal server error" + error.message });
  }
});

///////////////////  Get 10 blogs based on page and total count
///////////////////  query : page

Router.route("/")
  .get(async (req, res) => {
    const page = req.query.page || 1;
    try {
      const result = await blogs
        .find({})
        .populate("authorID")
        .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
        .skip((page - 1) * 10)
        .limit(10)
        .exec();
      const totalDocuments = await blogs.countDocuments();

      res.json({ result, totalDocuments });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: "An error occurred while fetching blogs : " + error.message,
      });
    }
  })
  //////////////      create new blog       /////////////////////////////

  .post(verifyToken, async (req, res) => {
    try {
      const { heading, content, blogImageURL } = req.body.blog;
      const authorID = req.user._id;
      const createdBlog = new blogs({
        heading,
        content,
        blogImageURL,
        authorID,
      });
      await createdBlog.save();
      res.json({ message: "Blog created successfully" });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ message: "Internal server error : " + error.message });
    }
  });

Router.route("/:blogID")

  ///////////////////////////////          get blog by ID             /////////////////////////////

  .get(async (req, res) => {
    try {
      const result = await blogs
        .findById(req.params.blogID)
        .populate("authorID")
        .exec();
      if (result === null) {
        return res.status(404).json({ message: "blog not found" });
      }
      res.json({ result });
    } catch (err) {
      console.log(
        "error while getting blog ",
        req.params.blogID,
        " ",
        err.message
      );
      res
        .status(500)
        .json({ message: "Internal server error : " + err.message });
    }
  })

  ///////////////////////////////          delete blog by ID          /////////////////////////////
  .delete(verifyToken, async (req, res) => {
    try {
      const result = await blogs.findByIdAndRemove(req.params.blogID);
      res.json({ message: "blog deleted successfully" });
    } catch (error) {
      console.log("Error while deleting blog", error.message);
      res
        .status(500)
        .json({ message: "Internal server error : " + error.message });
    }
  })

  ///////////////////////////////          update blog by ID          /////////////////////////////
  .put(verifyToken, async (req, res) => {
    try {
      const { heading, content, blogImageURL, isLiked } = req.body.blog;
      if (isLiked === true) console.log(req.body.blog);
      const userID = req.user._id;
      const result = await blogs.findByIdAndUpdate(
        req.params.blogID,
        {
          $set: {
            ...(heading ? { heading: heading } : {}),
            ...(content ? { content: content } : {}),
            ...(blogImageURL ? { blogImageURL: blogImageURL } : {}),
            ...(isLiked === true
              ? {
                  [`likedBy.${userID}`]: true,
                }
              : {}),
          },
          $unset: isLiked === false ? { [`likedBy.${userID}`]: 1 } : {},
          $inc: {
            likeCount: isLiked === true ? 1 : isLiked === false ? -1 : 0,
          },
        },
        { new: true } // returns the updated document
      );
      console.log("Updated blog:", result);
      res.json({ message: "Blog updated successfully" });
    } catch (error) {
      console.log("Error while updating blog:", error.message);
      res.status(500).json({ message: error.message });
    }
  });

module.exports = Router;
