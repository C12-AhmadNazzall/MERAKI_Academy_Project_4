const express = require("express");
const { creatNewPost, getPostById , getAllPosts , UpdatePostById , DeleteById , clickLikes , commentClick , findPost} = require("../controllers/posts");
const authentication = require("../middleware/authentication");
const postsRouter = express.Router();
postsRouter.post("/", authentication, creatNewPost);
postsRouter.get("/:id", authentication, getPostById);
postsRouter.get('/' , authentication,getAllPosts)
postsRouter.put('/:id' , authentication,UpdatePostById)
postsRouter.delete('/:id' , authentication,DeleteById)
postsRouter.post('/:id/addLike' , authentication , clickLikes)
postsRouter.put('/:id/commentPage' , authentication , commentClick)
postsRouter.get('/getOne' , authentication,findPost)
module.exports = postsRouter;
