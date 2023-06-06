const express = require('express')
const cors = require('cors')
const {blogModel} = require('./models/blogModel')
const connectDB = require('./mongooseConfig')
const app = express()
app.use(cors())
app.use(express.json())
// connecting to database 
connectDB()

app.get('/blogs', (req, res) => {
    blogModel.find({}).then((data)=>{res.send(data)})    
});
app.get('/myblogs/:userID',(req,res)=>{
    console.log(req.params.userID);
    blogModel.find({authorID:req.params.userID}).then((data)=>res.send(data))
})
app.get('/:blogID',async(req,res)=>{
    const id=req.params.blogID 
    try{
     await blogModel.findById(id).then((data)=>res.send(data))
    }catch(e){
        console.log(e); 
    }
})
app.delete('/myblogs/:blogID',(req,res)=>{
    blogModel.findByIdAndRemove(req.params.blogID).then(data=>{res.send(data)})
})
app.post('/newblog', async (req, res) => {
    const createdBlog=new blogModel(req.body)
    console.log(req.body)
   await createdBlog.save()
    res.json({ message: "Hello from server after newblog post!" });
})
app.listen(5000, () => { console.log('server started at 5000'); })