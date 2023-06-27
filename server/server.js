require('dotenv').config()
// console.log(process.env)
const Auth=require('./API/auth')
const cors = require('cors')
const Blogs=require('./API/blog')
const express = require('express')
const connectDB = require('./mongooseConfig')
const app = express()
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())
app.use('/auth',Auth)
app.use('/blogs',Blogs)

// connecting to database 
connectDB().then(()=>{ 
    app.listen(process.env.PORT || 5000, () => { console.log('server started at 5000'); })
})
// Starting the server