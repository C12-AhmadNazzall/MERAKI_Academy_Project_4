const followersModel = require("../models/folowersSchema");
const userModel = require('../models/userSchema')
const addFollower = (req, res) => {
  const user = req.token.userId;
  follower = new followersModel({
    user,
  })
  if (req.params.id !== req.token.userId) {
    
  
  follower
    .save()
    
    .then((response) => {
        
        
        userModel
        .findByIdAndUpdate(
            {_id : req.params.id ,},
            { $push: { followers: response.user } },
            { new: true }
        ).then(()=>{
            res.status(201).json({
                message : "Follower Added Successfully",
                follower : response.user
            })
        })
    })
    .catch((err)=>{
        res.status(500).json({
            err:err
        })
    })}
};
module.exports = {addFollower}
