import React, { useEffect, useState  , useContext} from 'react'
import { commentContext } from '../App'
import './Profile.css'
import { Avatar, Button, Input } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { HomeOutlined, LikeOutlined, LoginOutlined, MessageOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import Comments from './Comments'
const Profile = () => {
    const [userstate , setuserstate] = useState([])
    const [rePosts , setrePosts] = useState([])
    const {comment , setcomment} = useContext(commentContext)
    const user = JSON.parse(localStorage.getItem('User'))
    const [posts , setposts] = useState([])
   
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [isClicked , setisClicked] = useState(false)
    const [info , setinfo] = useState({image : '' , userName :''})
   
       const commentClicked = localStorage.getItem('commentClicked')
       useEffect(()=>{
        axios.get(`http://localhost:5000/users/${user._id}` ).then((res)=>{
            const userString = JSON.stringify(res.data.res)
           localStorage.setItem('User' ,userString)
         setuserstate(res.data.res)
         setrePosts(res.data.res.posts.reverse())
        }).catch((err)=>{
            console.log(err);
            
        }) 

    },[userstate])
   
    
  return (
    
    <div className='profile'>
         <div className="headProfile">
       
           
          
      
      
       <HomeOutlined className="homeProfile" title='Home' onClick={(e)=>{
           
           localStorage.setItem('commentClicked' , 'false')
        
           navigate('/')
           setTimeout(() => {
               navigate('/navbar')
           }, 1);
           
       }}/>
      
       
       <LoginOutlined className="logout" title='Log Out'  onClick={(e)=>{
           navigate('/')
       }}/>
       
       </div>
         {userstate.image === undefined ? <Avatar
                className="ProfileImage"
                title='Your Image' 
                src={
                  "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"
                }
              />
              : <Avatar
              className="ProfileImage"
               title='Your Image'
              src={
                userstate.image
              }
            />
            }
            {isClicked ? < ><br></br><br></br> 
            <span title='Get Image'><UploadOutlined className='upLoad'  /> 
            <h4 className='UploadParagraph'>Upload Image</h4></span>
            <Input  type='file'   className='imageEdit' placeholder='Image Source' onChange={(e)=>{
               
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0])
               reader.onload = ()=>{
                setinfo({image : reader.result , userName : info.userName })
               }
                
            }}/>
            </> : null}
        <h2 className='userNameProfile' title={userstate.userName}>{userstate.userName}</h2>
        <h2 className='followersHeaderProfile' title={userstate.userName + ' Followers'}>{userstate.followers?.length}<br></br> Followers</h2>
        {isClicked ?<> <Input className='paragraphEdit' title='Update Your User Name'placeholder='User Name' onChange={(e)=>{
                setinfo({image : info.image , userName : e.target.value })
            }}/><br></br></> : null}
        <br></br>   {!isClicked ? <Button className='profileButton' title='Edit Your Informations' onClick={(e)=>{
            setisClicked(true)
        }}>Edit Your Informations</Button> : <Button className='profileButton' onClick={(e)=>{
            setisClicked(false)
            axios.put(`http://localhost:5000/users/${userstate._id}` , {
                image : info.image , userName:info.userName
            }).then((response)=>{
                console.log(response);
                axios.get(`http://localhost:5000/users/${userstate._id}`).then((res)=>{
                    const newUser = JSON.stringify(res.data.res)
                    localStorage.setItem('User' , newUser)
                    navigate('/Navbar')
                    setTimeout(() => {
                        navigate('/profile')
                    }, 1);
                })
            }).catch((err)=>{
                console.log(err);
                
            })
           
            
        }}>Done</Button>}
        
           {commentClicked === 'false'? rePosts?.map((elem,ind)=>{
            return (
                <>
                <div className='postsProfile'>
                <div className="headerPost">
           <span title={userstate.userName + " Profile"}>
           {userstate.image === undefined ? <Avatar className="postUserimage" src={"https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"}/> :  <Avatar className="postUserimage" src={userstate.image}/>}
            
            <h3 className="userName">{userstate.userName}</h3>
            </span>
           <h3 className="paragraph">{elem.paragraph}</h3>
           {elem.image ? <image src={elem.image} className="postImage"></image> : null}
           </div>
    <div className="react">
    <LikeOutlined className={elem.likeClicked ? "clickedLike" : "Like"} title='Like' onClick={(e)=>{
        axios.post(`http://localhost:5000/posts/${elem._id}/addLike`,{
            likeClicked : !elem.likeClicked
        },
            { headers: { Authorization: token } }
        ).then((res)=>{
            axios.get(`http://localhost:5000/users/${userstate._id}` ).then((response)=>{
                const userString = JSON.stringify(response.data.res)
               localStorage.setItem('User' ,userString)
               
                
            }).catch((err)=>{
                console.log(err);
                
            }) 
         console.log(res);
            
           
            
            
        }).catch((err)=>{
            console.log(err);
            
        }) 
        
    

      
       
      
    }}/>
     <div className="commentsContainer">
    <MessageOutlined title='Comments' className="comment" onClick={(e)=>{
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
           localStorage.setItem('User' ,userString)
           
            
        }).catch((err)=>{
            console.log(err);
            
        })
        
           localStorage.setItem('postId' , elem._id )
           console.log(res.data.res);
           
          
           
       }).catch((err)=>{
           console.log(err);
           
       }) 
 
    }}/>
      <h2 className="commentsCounter">{elem.comments.length}</h2></div>
    </div>
    </div>
                </>
            )
        })
   :<Comments />}
    </div>
  )
}

export default Profile