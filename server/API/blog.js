const express = require('express')
const blogModel = require('../models/blog')
const Router = express.Router()

//Get blogs by user ID
Router.get('/myblogs/:userID', async (req, res) => {
    try {
        await blogModel.find({ authorID: req.params.userID }).then((data) => res.send(data))
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching your blogs');
    }
})
Router.route('/') 

    //get all blogs
    .get(async (req, res) => {
        try {
            await blogModel.find({}).then((data) => { res.send(data) })
        } catch (error) {
            console.log(error);
            res.status(500).send('An error occurred while fetching blogs from server');
        }
    })

    // create a new blog
    .post(async (req, res) => {
        try {
            // const createdBlog = new blogModel(req.body)
            // await createdBlog.save()
            res.json({ message: "Blog created successfully" });
        } catch (error) {
            res.status(500).send('An error occurred while creating the blog : ' + error.message);
        }
    });


Router.route('/:blogID')

    // get blog by ID
    .get(async (req, res) => {
        req.params.blogID
        try {
            await blogModel.findById(req.params.blogID).then((data) => res.send(data))
        } catch (e) {
            console.log(e);
            res.status(500).send('An error occurred while fetching the blog');
        }
    })

    // delete blog by ID
    .delete(async (req, res) => {
        try {
            await blogModel.findByIdAndRemove(req.params.blogID).then(data => { res.send(data) })
        } catch (error) {
            console.log(error);
            res.status(500).send('An error occurred while deleting the blog');
        }
    })

    // update blog by ID
    .put(async (req, res) => {
        await blogModel.findByIdAndUpdate(
            req.params.blogID
            , {
                $set: {
                    heading: req.body.heading,
                    content: req.body.content,
                    date: new Date(),
                }
            },
            { new: true } // This option returns the updated document
        ).then((updatedBlog) => {
            console.log('Updated blog:', updatedBlog);
            res.send('Blog updated successfully');
        }).catch((error) => {
            console.log('Error occured while updating blog:', error);
            res.status(500).send('An error occured while updating the blog')
        })
    });

module.exports = Router