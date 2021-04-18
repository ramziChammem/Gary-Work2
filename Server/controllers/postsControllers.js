const Posts = require("../models/SpPosts");

module.exports = {
  addPosts: async (req, res) => {
    const post = new Posts({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      image: req.body.image,
      spId: req.body.spId,
    });
    try {
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (err) {
      res.json({ message: err });
    }
  },

  getPosts: async (req, res) => {
    try {
      const posts = await Posts.find({ spId: req.params.id });
      res.send(posts);
    } catch (error) {
      console.log(error);
    }
  },
  deletePost: async (req, res) => {
    try {
      const deletePost = await Posts.findOneAndDelete({ _id: req.params.id });
      res.send(deletePost);
    } catch (error) {
      console.log(error);
    }
  },
};
