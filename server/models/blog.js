const mongoose = require("mongoose");
const { Schema } = mongoose;
// create a schema
const blogSchema = new Schema({
    // authorName :{type:String,required:true},
    // authorImageURL:{type:String,required:true},

    authorID: { type: Schema.Types.ObjectId, ref: 'User' }, 
    heading: {type:String,required:true},
    content: {type:String,required:true},
    blogImageURL:{type:String},
    date:Date,
    likeCount:Number,
    
});
const blog = mongoose.model('blogs', blogSchema);
module.exports = blog