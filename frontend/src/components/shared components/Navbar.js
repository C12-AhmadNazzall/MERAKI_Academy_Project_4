import React ,{useState , useContext , useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {HomeOutlined  , LoginOutlined  , SearchOutlined ,PlusOutlined , LikeOutlined ,MessageOutlined  }  from '@ant-design/icons'
import { Avatar  } from "antd";
import "./navbar.css";
import axios from "axios";
import { commentContext } from "../../App";
import Comments from "../Comments";
const Navbar = () => {
    
    localStorage.setItem('Counter' , 0)
    const getCounter = localStorage.getItem('Counter')
    const isClicked = localStorage.getItem('commentClicked')
    const user = JSON.parse(localStorage.getItem('User'))
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
            setposts(res.data.posts.reverse())
            
        }).catch((err)=>{
            console.log(err);
            
        }) 
        axios.get(`http://localhost:5000/users/${user._id}` ).then((res)=>{
            const userString = JSON.stringify(res.data.res)
           localStorage.setItem('User' ,userString)
           
            
        }).catch((err)=>{
            console.log(err);
            
        }) 
    },[posts])
  return (
    <div className='navbar'>
        
        <div className="head">
           
            {user.image === undefined ? <Avatar className="userimage" src={"https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"} onClick={(e)=>{
          
                axios.get(`http://localhost:5000/users/${user._id}` ).then((res)=>{
                    const userString = JSON.stringify(res.data.res)
                   localStorage.setItem('User' ,userString)
                   
                    
                }).catch((err)=>{
                    console.log(err);
                    
                }) 
                navigate('/profile')
            }}/> :  <Avatar className="userimage" src={user.image}  onClick={(e)=>{
              
                axios.get(`http://localhost:5000/users/${user._id}` ).then((res)=>{
                    const userString = JSON.stringify(res.data.res)
                   localStorage.setItem('User' ,userString)
                   
                    
                }).catch((err)=>{
                    console.log(err);
                    
                }) 
                navigate('/profile')
            }}/>}
       
        <div className="titel2">
        <HomeOutlined className="home" onClick={(e)=>{
            
            localStorage.setItem('commentClicked' , 'false')
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
        <SearchOutlined className="home" onClick={(e)=>{
            navigate('/search')
        }}/>
        <PlusOutlined className="home" onClick={(e)=>{
            navigate('/CreatePost')
        }}/>
        </div>
        <LoginOutlined className="settings" onClick={(e)=>{
            navigate('/')
        }}/>
        
        </div>
        {isClicked === 'false'? posts?.map((elem , ind)=>{
       
        
            
       return  <div className="posts">
               {isClicked === 'true'? <Comments />: 
               
               <>
      <div className="headerPost">
           <span>
           {elem.user.image === undefined ? <Avatar className="postUserimage" src={"https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"}/> :  <Avatar className="postUserimage" src={elem.user.image}/>}
            
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
           
           
           
           
       }).catch((err)=>{
           console.log(err);
           
       }) 
      
    }}/>
    <MessageOutlined className="comment" onClick={(e)=>{
       
       localStorage.setItem('commentClicked' , 'true')
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
   
   
   }) : <Comments />}
        
    
    </div>
  )
}

export default Navbar