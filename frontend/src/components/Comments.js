import React, { useContext, useState } from "react";
import { commentContext } from "../App";
import "./comment.css";
import { Avatar, Button, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";

const Comments = () => {
    const postId = localStorage.getItem('postId')
  const token = localStorage.getItem("token");
  const { comment, setcomment } = useContext(commentContext);
  const [element, setelement] = useState({});
  const commnetShow = JSON.parse(localStorage.getItem("comment")) || [];
  const [newComment, setnewComment] = useState({ comment: "", post: "" });

  return (
    <div className="comments">
      <div>
        <h2 className="commentshead">Comments ...</h2>
        <CloseOutlined
          className="close"
          onClick={(e) => {
            setcomment([]);

            axios
              .put(
                `http://localhost:5000/posts/${postId}/commentPage`,
                {
                  commentClicked: false,
                },
                { headers: { Authorization: token } }
              )
              .then((res) => {})
              .catch((err) => {
                console.log(err);
              });
          }}
        />
      </div>
      {commnetShow?.map((elem, ind) => {
        return (
          <div className="commentMessage">
            {elem.commenter.image ? (
              <image
                src={elem.commenter.image}
                className="commentUserImage"
              ></image>
            ) : (
              <Avatar
                className="commentUserImage"
                src={
                  "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"
                }
              />
            )}
            <h3 className="commenter">{elem.commenter.userName}</h3>
            <p className="commenterComment">{elem.comment}</p>
          </div>
        );
      })}
      <div className="creatComment">
        <Input
          className="commentInput"
          placeholder="Comment"
          onChange={(e) => {
            setnewComment({
              comment: e.target.value,
              post: postId,
            });
          }}
        />
        <Button
          className="commentButton"
          onClick={(e) => {
            setnewComment({
              comment: newComment.comment,
              post: newComment.post,
            });
            axios.post(`http://localhost:5000/comments/${newComment.post} `,{
                comment : newComment.comment
            },{ headers: { Authorization: token } }).then((res)=>{
             
            axios.get(`http://localhost:5000/posts/${newComment.post} ` , { headers: { Authorization: token } }).then((response)=>{
                console.log(response);
                const newArray = JSON.stringify(response.data.posts.comments)
                localStorage.setItem('comment' , newArray)
            }).catch((err)=>{
                console.log(err);
                
            })
            
           
               
                
            }).catch((err)=>{
                console.log(err);
                
            })
          }}
        >
          Comment
        </Button>
      </div>
    </div>
  );
};

export default Comments;
