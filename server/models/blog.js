const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({

  authorID: { type: Schema.Types.ObjectId, ref: 'user' },
  heading: { type: String, required: true },
  content: { type: String, required: true },
  blogImageURL: { type: String },
  likeCount: {type:Number,default:0},
  likedBy: { type: Map, of: Boolean, default: {} },
  createdAt: {
    type: Date,
    default: Date.now
  },

});
const blogs = mongoose.model('blogs', blogSchema);
module.exports = { blogs }