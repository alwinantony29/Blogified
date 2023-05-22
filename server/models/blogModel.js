const mongoose = require("mongoose");
const { Schema } = mongoose;
// create a schema
const blogSchema = new Schema({
    authorName: String,
    authorImageURL:String,
    date:String,
    blogImageURL:String,
    heading: String,
    content: String,
    
});
const blogModel = mongoose.model('blogs', blogSchema);

module.exports = blogModel