const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    userImageURL: { type: String, required: true },
    likedBlogs: [{ type: Schema.Types.ObjectId, ref: 'blog' }],
    about:String,
    status:String,       //options:active,blocked,deleted
})
const user = mongoose.model('user', userSchema)
module.exports = user