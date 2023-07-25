const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    userImageURL: { type: String, required: true },
    likedBlogs: [{ type: Schema.Types.ObjectId, ref: 'blog' }],
    about: String,
    status: { type: String, default: "active" }, //options:active,blocked,deleted
    verified: { type: Boolean, default: false },
})
const user = mongoose.model('user', userSchema)
module.exports = user