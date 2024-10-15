import React , {createContext, useState} from "react";
import "./App.css";
import CreatePost from "./components/CreatePost";
import Login from "./components/shared components/Login";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./components/shared components/Register";
import Navbar from "./components/shared components/Navbar";
import Profile from "./components/Profile";
import Search from "./components/Search";
import UserProfile from "./components/UserProfile";
export const commentContext = createContext()
const App = () => {
  const [comment , setcomment] = useState([])
  return (
    <commentContext.Provider value={{comment , setcomment}}>
    <div className="App">
      <Routes>
      
       <Route path="/register" element={<Register />} />
       <Route path="/" element={<Login />} />
       <Route path="/Navbar" element={<Navbar />} />
       <Route path="/CreatePost" element={<CreatePost />} />
       <Route path="/profile" element={<Profile />} />
       <Route path="/search" element={<Search />} />
       <Route path="/search/user/profile" element={<UserProfile />} />
    </Routes>
       
  
    </div>
    </commentContext.Provider>
  );
};

export default App;
