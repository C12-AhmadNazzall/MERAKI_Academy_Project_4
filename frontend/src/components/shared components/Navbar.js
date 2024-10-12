import React ,{useState , useContext , useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {HomeOutlined  , SettingOutlined , SearchOutlined ,PlusOutlined , LikeOutlined ,MessageOutlined  }  from '@ant-design/icons'
import { Avatar  } from "antd";
import "./navbar.css";
import axios from "axios";
import { commentContext } from "../../App";
import Comments from "../Comments";
const Navbar = () => {
    const postid = localStorage.getItem('postId') || ''
    const {comment , setcomment} = useContext(commentContext)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [posts , setposts] = useState([])
    const [commentPage , setcommentPage] = useState(false)
    useEffect(()=>{
        axios.get('http://localhost:5000/posts' ,{
            headers: { Authorization: token }
        }).then((res)=>{
            setposts(res.data.Posts)
            
        }).catch((err)=>{
            console.log(err);
            
        }) 

    },[posts])
  return (
    <div className='navbar'>
        
        <div className="head">
        <Avatar className="userimage" src={"https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"}/>
        <div className="titel2">
        <HomeOutlined className="home" onClick={(e)=>{
            if (postid !== '') {
                
            
            axios.put(`http://localhost:5000/posts/${postid}/commentPage`,{
                commentClicked : false
            },
                { headers: { Authorization: token } }
            ).then((res)=>{
               console.log(res);
               
                
            }).catch((err)=>{
                console.log(err);
                
            }) 
        }
            navigate('/')
            setTimeout(() => {
                navigate('/navbar')
            }, 1);
            
        }}/>
        <SearchOutlined className="home"/>
        <PlusOutlined className="home"/>
        </div>
        <SettingOutlined className="settings"/>
        
        </div>
        {posts?.map((elem , ind)=>{
        
            return  <div className="posts">
                    {elem.commentClicked ? <Comments /> : 
                    
                    <>
           <div className="headerPost">
                <span>
                 {elem.user.image ? <image src={elem.user.image} className="postUserImage"></image> : <Avatar className="postUserimage" src={"https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"}/>}
                 <h3 className="userName">{elem.user.userName}</h3>
                 </span>
                <h3 className="paragraph">{elem.paragraph}</h3>
                {elem.image ? <image src={elem.image} className="postImage"></image> : null}
                </div>
         <div className="react">
         <LikeOutlined className={elem.likeClicked ? "clickedLike" : "Like"} onClick={(e)=>{
         
    
           
            
            axios.post(`http://localhost:5000/posts/${elem._id}/addLike`,{
                likeClicked : !elem.likeClicked
            },
                { headers: { Authorization: token } }
            ).then((res)=>{
                
                
                setposts([...posts , res.data.res])
                
            }).catch((err)=>{
                console.log(err);
                
            }) 
           
         }}/>
         <MessageOutlined className="comment" onClick={(e)=>{
            setcomment(elem)
            setcommentPage(true)
            const commentstorage = JSON.stringify(elem.comments)
            localStorage.setItem('comment' , commentstorage)
            axios.put(`http://localhost:5000/posts/${elem._id}/commentPage`,{
                commentClicked : !elem.commentClicked
            },
                { headers: { Authorization: token } }
            ).then((res)=>{
                localStorage.setItem('postId' , elem._id )
                
                setposts([...posts , res.data.res])
                
            }).catch((err)=>{
                console.log(err);
                
            }) 
      
         }}/>
         
         </div>
         </>
        }
        </div>
        
        })}
    
    </div>
  )
}

export default Navbar