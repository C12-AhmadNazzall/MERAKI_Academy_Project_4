const express = require('express')
const {addFollower , deleteFolower} = require('../controllers/follower');
const authentication = require('../middleware/authentication');
const followerRouter = express.Router();
followerRouter.post("/:id" , authentication, addFollower)
followerRouter.delete("/:id/:userId" , authentication, deleteFolower)
module.exports = followerRouter