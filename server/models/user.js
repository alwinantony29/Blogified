const mongoose = require("mongoose");
const { Schema } = mongoose;
// create a schema
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    userImageURL: { type: String, required: true },
    likedBlogs: [{ type: Schema.Types.ObjectId, ref: 'blog' }]
})
const user = mongoose.model('user', userSchema)
module.exports = user