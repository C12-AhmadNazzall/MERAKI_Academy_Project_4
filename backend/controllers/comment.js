const { response, json } = require("express");
const commentModel = require("../models/commentSchema");
const postsModel = require("../models/postsSchema");

const creatComment = (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;
  const commenter = req.token.userId;
  const newComment = new commentModel({
    comment,
    commenter,
  });
  newComment
    .save()
    .then((response) => {
      postsModel
        .findByIdAndUpdate(
          { _id: id },
          { $push: { comments: response._id } },
          { new: true }
        )
        .then(() => {
          res.status(201).json({
            message: "Comment Created Successfully",
            comment: response,
          });
        });
    })
    
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};
const UpdateComment = (req , res)=>{
    const {comment} = req.body
    commentModel.findByIdAndUpdate(
        req.params.id , {comment}
      ).then((response)=>{
       
        
        res.status(201).json({
            Message : "Comment Updated Successfully",
           
        })
    }).catch((err)=>{
        res.status(500).json({
            err : err
        })
    })

}
const deleteCommentById = (req,res)=>{
    commentModel.findByIdAndDelete(req.params.id).then((response)=>{
        res.status(201).json({
            message : "Comment Deleted Successfully"
        })
    }).catch((err)=>{
        res.status(500).json({
            err : err
        })
    })
}
module.exports = { creatComment ,UpdateComment ,deleteCommentById};
