const express = require('express')
const cors = require('cors')
const blogModel = require('./models/blogModel')
const connectDB = require('./mongooseConfig')
const app = express()
app.use(cors())
app.use(express.json())
// connecting to database
connectDB()
app.get('/', (req, res) => {
    res.json({ message: "Hello from server!" });
});
app.post('/newblog', async (req, res) => {
    blogModel.create(req.body)
    res.json({ message: "Hello from server after newblog post!" });
})
app.listen(5000, () => { console.log('server started at 5000'); })