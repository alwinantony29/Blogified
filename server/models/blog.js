const mongoose = require("mongoose");
const { Schema } = mongoose;
// create a schema
const blogSchema = new Schema({
    authorName :{type:String,required:true},
    authorID:{type:String,required:true},  
    authorImageURL:{type:String,required:true},
    date:Date,
    blogImageURL:{type:String},
    heading: {type:String,required:true},
    content: {type:String,required:true},
    likeCount:Number,
    
});
const blog = mongoose.model('blogs', blogSchema);
module.exports = blog