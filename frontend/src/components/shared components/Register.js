import React ,{useState , useContext} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Card, Input, Button  } from "antd";
import "./register.css"
import axios from 'axios'
const Register = () => {
    const [input, setinput] = useState({userName : "" , email: "" , password: ""});
    const navigate = useNavigate()
  return (
    <div className='register'>
        <Card className={"card"} md>
        <div className={"titles"}>
          <div className={"login"}>
            <h1 className={"loginTitle"}>Sing Up</h1>
            <Input className={"inp1"} type={"text"} placeholder={"User Name"} onChange={(e)=>{
                input.userName = e.target.value
            }}/>
            <br></br>
            <br></br>
            <Input className={"inp1"} type={"Email"} placeholder={"Email"} onChange={(e)=>{
              input.email = e.target.value
            }}/>
            <br></br>
            <br></br>
            <Input
              className={"inp1"}
              type={"password"}
              placeholder={"Password"}
              onChange={(e)=>{
             input.password = e.target.value
                
                
            }}/>
            <br></br> <br></br>
            <Button className={"btn1"} onClick={(e)=>{
                setinput(input)
                axios.post("http://localhost:5000/users/register" ,{
                    userName : input.userName , email : input.email , password : input.password
                }).then((res)=>{
                    setinput({userName : "" , email: "" , password: ""})
                    console.log(res);
                    
                }).catch((err)=>{
                    console.log(err);
                    
                })
                navigate("/")
            }}>Register</Button><br></br>
           
          
          
          </div>
        </div>
      </Card>

    </div>
  )
}

export default Register