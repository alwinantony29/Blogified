const mongoose = require("mongoose");
const { Schema } = mongoose;
// create a schema
const blogSchema = new Schema({

  authorID: { type: Schema.Types.ObjectId, ref: 'user' },
  heading: { type: String, required: true },
  content: { type: String, required: true },
  blogImageURL: { type: String },
  likeCount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },

});
const blogs = mongoose.model('blogs', blogSchema);
module.exports = { blogs }