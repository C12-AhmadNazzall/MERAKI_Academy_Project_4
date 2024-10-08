const express = require('express')
const {addFollower} = require('../controllers/follower');
const authentication = require('../middleware/authentication');
const followerRouter = express.Router();
followerRouter.post("/:id" , authentication, addFollower)
module.exports = followerRouter