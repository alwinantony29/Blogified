const mongoose = require("mongoose");
const { Schema } = mongoose;
// create a schema
const userSchema=new Schema({
    email:{type:String,required:true},
    userName:{type:String,required:true},
    userImageURL:{type:String,required:true},
    likedBlogs:Array,
})
const user = mongoose.model('users',userSchema)
module.exports = user