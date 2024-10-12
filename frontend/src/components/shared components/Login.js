import React ,{useState , useContext} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Card, Input, Button  } from "antd";
import "./login.css";
import axios from "axios";
const Login = () => {
  const [token , settoken] = useState('')
  const [input, setinput] = useState({email: "" , password: ""});
 const navigate = useNavigate()
  return (
    <div>
      <Card className={"card"} md>
        <div className={"titles"}>
          <div className={"login"}>
            <h1 className={"loginTitle"}>Login</h1>
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
              axios.post("http://localhost:5000/users/login", {
                email: input.email,
                password: input.password,
              })
              .then(function (res) {
                  localStorage.setItem('token',res.data.token)
                  settoken(res.data.token)
                 
                  setinput({email: "" , password: ""});
                  navigate("/navbar");
                
                })
                .catch(function (err) {
                  console.log(err);
                });
            }}>Log In</Button><br></br>
           
            <a className="anchor" onClick={(e)=>{
              navigate("/register");
            }}>Create Account</a>
          
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
