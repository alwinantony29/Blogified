const mongoose = require("mongoose");
const { Schema } = mongoose;
// create a schema
const userSchema=new Schema({
    userID:Number,
    userName:String,
    likedBlogs:Array,
})
const blogSchema = new Schema({
    authorName: String,
    authorID:String,  
    authorImageURL:String,
    date:String,
    blogImageURL:String,
    heading: String,
    content: String,
    likeCount:Number,
    
});
const blogModel = mongoose.model('blogs', blogSchema);
const userModel = mongoose.model('user',userSchema)
module.exports = {blogModel,userModel}