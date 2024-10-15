import React, { useEffect, useState, useContext } from "react";
import { commentContext } from "../App";
import {
  HomeOutlined,
  LoginOutlined,
  SearchOutlined,
  PlusOutlined,
  LikeOutlined,
  MessageOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import "./Profile.css";
import { Avatar, Button, Input, Space, GetProps, Card } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./search.css";

const Search = () => {
    const islogin = JSON.parse(localStorage.getItem("User"))
  let [usersArray , setusersArray] = useState([]);
  const [allUsers, setallUsers] = useState([]);
  const [inputValue, setinputValue] = useState("");
  const user = JSON.parse(localStorage.getItem("User"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
    
  return (
    <div className="search">
      <div className="headSearch">
        {user.image === undefined ? (
          <Avatar
            className="userimage"
            src={
              "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"
            }
            onClick={(e) => {
              axios
                .get(`http://localhost:5000/users/${user._id}`)
                .then((res) => {
                  const userString = JSON.stringify(res.data.res);
                  localStorage.setItem("User", userString);
                })
                .catch((err) => {
                  console.log(err);
                });
              navigate("/profile");
            }}
          />
        ) : (
          <Avatar
            className="userimage"
            src={user.image}
            onClick={(e) => {
              axios
                .get(`http://localhost:5000/users/${user._id}`)
                .then((res) => {
                  const userString = JSON.stringify(res.data.res);
                  localStorage.setItem("User", userString);
                })
                .catch((err) => {
                  console.log(err);
                });
              navigate("/profile");
            }}
          />
        )}

        <div className="titel3">
          <HomeOutlined
            className="homeSearch"
            onClick={(e) => {
              navigate("/Navbar");
            }}
          />
        </div>
        <div className="searchDiv">
          <Input
            className="searchInput"
            placeholder="Search ..."
            onChange={(e) => {
              setinputValue(e.target.value);
            }}
          />
          <Button
            className="searchButton"
            onClick={(e) => {
              axios
                .get(`http://localhost:5000/users/${inputValue}/userName`)
                .then((res) => {
                  
                  res.data.res.map((ele ,i)=>{
                    if (ele._id === islogin._id) {
                      
                        res.data.res.splice(i,1)
                    }
                })
                const strUsers = JSON.stringify(res.data.res);
                localStorage.setItem("AllUsers", strUsers);
                setusersArray(JSON.parse(localStorage.getItem("AllUsers")))
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <SearchOutlined />
          </Button>
        </div>
      </div>
      <div className="parents">
      {usersArray?.map((elem, ind) => {
        return (
          <div className="AllUsers">
            <Card
              className="OneUser"
              cover={
                elem.image === undefined ? (
                  <Avatar
                    className="searchedUserImage"
                    src={
                      "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"
                    }
                  />
                ) : (
                  <Avatar className="searchedUserImage" src={elem.image} />
                )
              }
            onClick={(e)=>{
                const userStorage = JSON.stringify(elem)
                localStorage.setItem('serarchUser' , userStorage)
                navigate(`user/profile`)
            }}>
              <h3 className="SearchUserName">{elem.userName}</h3>
            </Card>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default Search;
