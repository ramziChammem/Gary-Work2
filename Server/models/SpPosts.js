const mongoose = require("mongoose");

// schema for spPosts
const postsSchema = new mongoose.Schema(
  {
   
   title:{ type: String},
   description: { type: String},
   image: { type: String},
   date:{type:String},
   email:{type:String},
   spId:{type:String},
},
  { timestamps: true }
);

const Post = mongoose.model("Post", postsSchema);

module.exports = Post;