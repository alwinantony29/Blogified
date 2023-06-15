require('dotenv').config()
// console.log(process.env)
const express = require('express')
const cors = require('cors')
const { blogModel } = require('./models/blogModel')
const connectDB = require('./mongooseConfig')
const { cloud } = require('./cloudinaryConfig')
const app = express()
app.use(cors())
app.use(express.json())

// connecting to database 
connectDB()

app.route('/blogs')

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
            console.log(req.body);
            cloud.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
                { public_id: "olympic_flag" },
                function (error, result) { console.log(result); });

            // const createdBlog = new blogModel(req.body)
            // await createdBlog.save()
            res.json({ message: "Blog created successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).send('An error occurred while creating the blog');
        }
    });

//Get blogs by user ID
app.get('/myblogs/:userID', async (req, res) => {
    try {
        await blogModel.find({ authorID: req.params.userID }).then((data) => res.send(data))
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while fetching blogs');
    }
})

app.route('/blogs/:blogID')

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

// Starting the server
app.listen(process.env.PORT || 5000, () => { console.log('server started at 5000'); })