const mongoose = require("mongoose");
const { Schema } = mongoose;
// create a schema
const blogSchema = new Schema({
    heading: String,
    content: String,
    authorName: String,
});
const blogModel = mongoose.model('blogs', blogSchema);

module.exports = blogModel