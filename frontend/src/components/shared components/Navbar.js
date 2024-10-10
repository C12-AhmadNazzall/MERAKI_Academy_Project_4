import React ,{useState , useContext} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {HomeOutlined  , SettingOutlined , SearchOutlined }  from '@ant-design/icons'
import { Avatar  } from "antd";
import "./navbar.css";
import axios from "axios";

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="head">
        <Avatar className="userimage" src={"https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"}/>
        <div className="titel2">
        <HomeOutlined />
        <SearchOutlined />
        </div>
        <SettingOutlined className="settings"/>
        </div>

    </div>
  )
}

export default Navbar