import React, { useEffect, useState  , useContext} from 'react'
import { commentContext } from '../App'
import './Profile.css'
import { Avatar, Button, Input } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { HomeOutlined, LikeOutlined, LoginOutlined, MessageOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import Comments from './Comments'
import './follow.css'
const UserProfile = () => {
    const isLogin = JSON.parse(localStorage.getItem('User'))
    const [userstate , setuserstate] = useState([])
    const [rePosts , setrePosts] = useState([])
    const {comment , setcomment} = useContext(commentContext)
    const user = JSON.parse(localStorage.getItem('serarchUser'))
    const [posts , setposts] = useState([])
   
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [isClicked , setisClicked] = useState(false)
    const [info , setinfo] = useState({image : '' , userName :''})
   
       const commentClicked = localStorage.getItem('commentClicked')
       useEffect(()=>{
        axios.get(`http://localhost:5000/users/${user._id}` ).then((res)=>{
            const userString = JSON.stringify(res.data.res)
           localStorage.setItem('serarchUser' ,userString)
         setuserstate(res.data.res)
         setrePosts(res.data.res.posts.reverse())
        }).catch((err)=>{
            console.log(err);
            
        }) 

    },[userstate])
   
    
  return (
    
    <div className='profile'>
         <div className="headProfile">
       
           
          
      
      
       <HomeOutlined className="homeProfile" onClick={(e)=>{
           
           localStorage.setItem('commentClicked' , 'false')
        
           navigate('/')
           setTimeout(() => {
               navigate('/navbar')
           }, 1);
           
       }}/>
      
       
       <LoginOutlined className="logout" onClick={(e)=>{
           navigate('/')
       }}/>
       
       </div>
         {userstate.image === undefined ? <Avatar
                className="ProfileImage"
                src={
                  "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"
                }
              />
              : <Avatar
              className="ProfileImage"
              src={
                userstate.image
              }
            />
            }
            
        <h2 className='userNameProfile'>{userstate.userName}</h2>
            {user.followers.includes(isLogin._id) ?  <Button className='removeFollow' onClick={(e)=>{
                 axios.delete(`http://localhost:5000/followers/${userstate._id}` ,{
                    headers: { Authorization: token }
                } ).then((response)=>{
                  
                   
                   
                    
                }).catch((err)=>{
                    console.log(err);
                    
                }) 
            }}>Remove Follow</Button> : <Button className='AddFollow' onClick={(e)=>{
                 axios.post(`http://localhost:5000/followers/${userstate._id}`,{} ,{
                    headers: { Authorization: token }
                } ).then((response)=>{
                    
                   
                   
                    
                }).catch((err)=>{
                    console.log(err);
                    
                }) 
            }}>Follow</Button>}
        <br></br>   
           {commentClicked === 'false'? rePosts?.map((elem,ind)=>{
            return (
                <>
                <div className='postsProfile'>
                <div className="headerPost">
           <span>
           {userstate.image === undefined ? <Avatar className="postUserimage" src={"https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"}/> :  <Avatar className="postUserimage" src={userstate.image}/>}
            
            <h3 className="userName">{userstate.userName}</h3>
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
            axios.get(`http://localhost:5000/users/${userstate._id}` ).then((response)=>{
                const userString = JSON.stringify(response.data.res)
               localStorage.setItem('serarchUser' ,userString)
               
                
            }).catch((err)=>{
                console.log(err);
                
            }) 
        
            
           
            
            
        }).catch((err)=>{
            console.log(err);
            
        }) 
        
    

      
       
      
    }}/>
    <MessageOutlined className="comment" onClick={(e)=>{
       elem.comments?.map((ele ,index)=>{
        
        
       })
       localStorage.setItem('commentClicked' , 'true')
       setcomment(elem)
      
      
       const commentstorage = JSON.stringify(elem.comments)
       localStorage.setItem('comment' , commentstorage)
       axios.put(`http://localhost:5000/posts/${elem._id}/commentPage`,{
           commentClicked : !elem.commentClicked
       },
           { headers: { Authorization: token } }
       ).then((res)=>{
        axios.get(`http://localhost:5000/users/${userstate._id}` ).then((response)=>{
            const userString = JSON.stringify(response.data.rea)
           localStorage.setItem('serarchUser' ,userString)
           
            
        }).catch((err)=>{
            console.log(err);
            
        })
        
           localStorage.setItem('postId' , elem._id )
           console.log(res.data.res);
           
          
           
       }).catch((err)=>{
           console.log(err);
           
       }) 
 
    }}/>
    
    </div>
    </div>
                </>
            )
        })
   :<Comments />}
    </div>
  )
}

export default UserProfile