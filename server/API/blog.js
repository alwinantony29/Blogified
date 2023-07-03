const express = require('express')
const { blogs } = require('../models/blog')
const { verifyToken } = require('../Helpers')
const Router = express.Router()

///////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////     Get blogs written by current signed in user     //////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

Router.get('/myblogs', verifyToken, async (req, res) => {
    try {
        const result = await blogs.find({ authorID: req.user._id }).lean()
        res.json({ result })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'An error occurred while fetching your blogs' + error.message });
    }
})
Router.route('/')

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////         Get all blogs        /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    .get(async (req, res) => {
        try {
            const result = await blogs.find({})
                .populate("authorID", "-_id") // Exclude the _id field
                .lean().exec()
            // this is what renaming authorID to user looks like, let client side deal with that
            // const result = data.map(blog => {
            //     return { ...blog, user: blog.authorID }
            // })
            //     .map(({ authorID, ...rest }) => rest);

            res.json({ result })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'An error occurred while fetching blogs : ' + error.message });
        }
    })
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////         create a new blog        //////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    .post(verifyToken, async (req, res) => {
        try {
            const { heading, content, authorName, authorImageURL, blogImageURL } = req.body.blogData
            const authorID = req.user._id
            const createdBlog = new blogs({ heading, content, authorName, authorImageURL, blogImageURL, authorID })
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
        req.params.blogID
        try {
            const result = await blogs.findById(req.params.blogID)
                .populate("authorID", "-_id") // Exclude the _id field
                .lean().exec()

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
            console.log(error.message);
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