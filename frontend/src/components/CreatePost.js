import React, { useContext, useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import './createPost.css'
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
const CreatePost = () => {
    const [paragraph , setparagraph] = useState('')
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('User'))
  return (
    <div className='CreatePost'>
       <CloseOutlined className="closeCreatePost" onClick={(e)=>{
        navigate('/Navbar')
        
       }}/>
    <h2 className="CreatePostHeader">Create Post ..</h2>
    <div>
<textarea rows={'10'} cols={'70'} placeholder="What Do You Thinking ?.." className="textArea" onChange={(e)=>{
    setparagraph(e.target.value)
}}></textarea><br></br>
<Button className="PostButton" onClick={(e)=>{
     axios.post('http://localhost:5000/posts',{
        paragraph : paragraph
     } ,{
        headers: { Authorization: token }
    }).then((res)=>{
        
    }).catch((err)=>{
        console.log(err);
        
    }) 
    
    navigate('/Navbar')
}}>Post</Button>
    </div>
    </div>
  )
}

export default CreatePost