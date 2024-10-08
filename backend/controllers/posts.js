const { response } = require("express");
const postsModel = require("../models/postsSchema");
const userModel = require('../models/userSchema')
const creatNewPost = (req, res) => {
  const { paragraph, image } = req.body;
  const post = new postsModel({
    paragraph,
    image,
    likes: 0,
    user: req.token.userId,
  });
  post
    .save()
    .then((response)=>{

        
        userModel
        .findByIdAndUpdate(
          { _id: req.token.userId },
          { $push: { Posts: response._id } },
          { new: true }
        )

    .then((resp) => {
      res.status(201).json({
        message: "post Created Successfully",
        post: response,
        token: req.token,
      });
    })    
})
    .catch((err) => {
        console.log(err);
        
      res.status(500).json({
        err: err,
      });
    });
};
const getPostById = (req, res) => {
  const id = req.params.id;
  postsModel
    .findById(id)
    .populate("user")
    .populate({ path: "comments", populate: { path: "commenter" } })
    .then((response) => {
      res.status(200).json({
        posts: response,
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        err: err,
      });
    });
};
const getAllPosts = (req,res)=>{
    postsModel.find({})
    .populate("user")
    .populate("comments")
    .then((response)=>{
        res.status(200).json({
            Posts : response
        })
    }).catch((err)=>{
        res.status(404).json({
            err:err
        })
    })
}
const UpdatePostById = (req,res)=>{
    const {paragraph , image} = req.body
    postsModel
    .findByIdAndUpdate(
      req.params.id , {paragraph , image}
    ).then((response)=>{
        res.status(201).json({
            message : "Updated Successfully",
            newPost : response
        })
    }).catch((err)=>{
        res.status(500).json({
            err : err
        })
    })
}
const DeleteById = (req,res)=>{
    postsModel
    .findByIdAndDelete(
        req.params.id
    ).then((response)=>{
       
        
        userModel
        .findByIdAndUpdate(
          { _id: req.token.userId },
          { $pull: { Posts: response._id } },
          { new: true }
        )
        .then((resp)=>{
           
            
            res.status(201).json({
                message : "Post Deleted successfully"
            
           })
        })
    }
    )
   
    .catch((err)=>{
        res.status(500).json({
            err : err
        })
    })
}
module.exports = { creatNewPost, getPostById , getAllPosts , UpdatePostById , DeleteById};
