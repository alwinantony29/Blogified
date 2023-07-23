const express = require('express')
const { blogs } = require('../models/blog')
const { verifyToken } = require('../Helpers')
const Router = express.Router()

//////////////   Get blogs written by current signed in user and total count
//////////////   query : page      

Router.get('/myblogs', verifyToken, async (req, res) => {

    const page = req.query.page
    try {
        const result = await blogs.find({ authorID: req.user._id })
            .select("-authorID") // Excluding the authorID field
            .skip((page - 1) * 10)
            .limit(10).exec()
        const totalDocuments = await blogs.countDocuments({ authorID: req.user._id });
        res.json({ result, totalDocuments })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'An error occurred while fetching your blogs' + error.message });
    }
})
Router.route('/')

    ///////////////////  Get 10 blogs based on page  and total count 
    ///////////////////  query : page  

    .get(async (req, res) => {

        const page = req.query.page
        try {
            const result = await blogs.find({})
                .populate("authorID", "-_id") // Exclude the _id field
                .skip((page - 1) * 10)
                .limit(10).exec()
            // this is what renaming authorID to user looks like, let client side deal with that :)
            // const result = data.map(blog => {
            //     return { ...blog, user: blog.authorID }
            // })
            //     .map(({ authorID, ...rest }) => rest);
            const totalDocuments = await blogs.countDocuments();

            res.json({ result, totalDocuments })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'An error occurred while fetching blogs : ' + error.message });
        }
    })
    //////////////      create a new blog       /////////////////////////////

    .post(verifyToken, async (req, res) => {
        try {
            const { heading, content, blogImageURL } = req.body.blog
            const authorID = req.user._id
            const createdBlog = new blogs({ heading, content, blogImageURL, authorID })
            await createdBlog.save()
            res.json({ message: "Blog created successfully" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'An error occurred while creating the blog : ' + error.message });
        }
    });


Router.route('/:blogID')

    ///////////////////////////////          get blog by ID             /////////////////////////////

    .get(async (req, res) => {
        console.log("getting blog")
        try {
            const result = await blogs.findById(req.params.blogID)
                .populate("authorID", "-_id") // Exclude the _id field
                .exec()
            console.log("type of date from db : ", typeof (result.createdAt));
            res.json({ result })
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: 'An error occurred while fetching the blog: ' + err.message });
        }
    })

    ///////////////////////////////          delete blog by ID          /////////////////////////////
    .delete(async (req, res) => {
        try {
            const result = await blogs.findByIdAndRemove(req.params.blogID)
            res.json({ message: "blog deleted succesfully" })
        } catch (error) {
            console.log("Error while deleting blog", error.message);
            res.status(500).json({ message: 'An error occurred while deleting the blog : ' + error.message })
        }
    })

    ///////////////////////////////          update blog by ID          /////////////////////////////
    .put(async (req, res) => {
        try {
            const { heading, content, blogImageURL } = req.body.blog
            const result = await blogs.findByIdAndUpdate(
                req.params.blogID,
                {
                    $set: {
                        heading: heading, content: content, blogImageURL: blogImageURL,
                    }
                }, { new: true } // This option returns the updated document
            )
            console.log('Updated blog:', result)
            res.json({ message: 'Blog updated successfully' })
        } catch (error) {
            console.log('Error while updating blog:', error.message);
            res.status(500).json({ message: 'An error occured while updating the blog' + error.message })
        }
    })

module.exports = Router