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
        ).then((response)=>{
            res.status(201).json({
                message : "Follower Added Successfully",
                follower : response.user,
                res : response
            })
        })
    })
    .catch((err)=>{
        res.status(500).json({
            err:err
        })
    })}
};
const deleteFolower = (req,res)=>{
    const user = req.token.userId;
    
    userModel.findByIdAndUpdate(
        {_id : req.params.userId ,},
        { $pull: { followers: user } },
        { new: true }
    ).then((resp)=>{
        res.status(201).json({
            message : "Follower Deleted Successfully",
            res : resp
        })
    }).catch((err)=>{
        console.log(err);
        
        res.status(500).json({
            err : err
        })
    })
}
module.exports = {addFollower , deleteFolower}
