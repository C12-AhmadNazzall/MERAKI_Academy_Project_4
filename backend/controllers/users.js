const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const register = (req, res) => {
  const { userName, email, password, phoneNumber , image ,posts} = req.body;
  const user = new userModel({
    userName,
    email,
    password,
    phoneNumber,
    role: "6702e78491ebbce271d05d93",
    image ,
    posts
  });
  
  user
    .save()
    .then((response) => {
      res.status(201).json({
        meassage: "User Created Successfully",
        UserInfo: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
const Login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  userModel
    .findOne({ email })
    .populate("role", "-_id -__v")
    .populate({path : "posts" , populate:{path:"comments" }})
    .then(async (result) => {
      if (!res) {
        return res.status(403).json({
          message: `The email or the password is inncorrect`,
        });
      }
      const hashedPassword = result.password;

      try {
        const isSamePassword = await bcrypt.compare(password, hashedPassword);

        if (!isSamePassword) {
          return res.status(403).json({
            message: `The password is inncorrect`,
          });
        }
        const payload = {
          userId: result._id,
          user: result.userName,
          role: result.role,
        };

        const options = {
          expiresIn: "60m",
        };

        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          user: result,
          message: `LogIn Successfully`,
          token: token,
          user : result
        });
      } catch (error) {}
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};
const UpdateUser = (req,res)=>{
  const {userName , image} = req.body
  userModel.findByIdAndUpdate(
    req.params.id , {userName , image})
    .then((response)=>{
      res.status(201).json({
          message : "Updated Successfully",
          res : response
      })
  }).catch((err)=>{
      res.status(500).json({
          err : err
      })
  })
  
}
const getAllUsers = (req,res)=>{
  userModel.find({}).then((response)=>{
    res.status(200).json({
      res:response
    })
    
  })
}
const getUserById = (req,res)=>{
  userModel.findById(req.params.id)
  .populate({path : "posts" , populate:{path:"comments" , populate:{path : "commenter"}}})
  .then((response)=>{
    res.status(200).json({
      res:response
    })
    
  })
}
const getUserByUserName = (req,res)=>{
  userModel.find({userName : req.params.userName})
  .populate("role", "-_id -__v")
  .populate({path : "posts" , populate:{path:"comments" , populate:{path:"commenter" }}})
  .then((response)=>{
    if (response.length) {
      
      res.status(200).json({
        res:response
      })
    }
    else{
      res.status(404).json({
        message : 'User Not Found'
      })
    }
  }).catch((err)=>{
    res.status(500).json({
      err:err 
    })
  })
}
module.exports = { register, Login , UpdateUser ,getAllUsers , getUserById,getUserByUserName};
