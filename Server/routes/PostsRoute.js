const express = require('express');
const router = express.Router();
const PostsControllers=require("../controllers/postsControllers")

router.get('/:id', PostsControllers.getPosts);
router.post('/', PostsControllers.addPosts);
router.delete('/:id', PostsControllers.deletePost)



module.exports = router;