const express = require("express");
const { creatComment ,UpdateComment ,deleteCommentById} = require("../controllers/comment");
const authorization = require("../middleware/authorization");
const authentication = require("../middleware/authentication");
const commentRouter = express.Router();
commentRouter.post(
  "/:id",
  authentication,
  authorization("Create-Comments"),
  creatComment
);
commentRouter.put('/:id' , authentication , UpdateComment)
commentRouter.delete('/:id' , authentication , deleteCommentById)

module.exports = commentRouter;
