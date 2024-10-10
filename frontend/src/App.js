import React from "react";
import "./App.css";
import Login from "./components/shared components/Login";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./components/shared components/Register";
import Navbar from "./components/shared components/Navbar";
const App = () => {
  return (
    <div className="App">
      <Routes>
      
       <Route path="/register" element={<Register />} />
       <Route path="/" element={<Login />} />
       <Route path="/Navbar" element={<Navbar />} />
    </Routes>
  
    </div>
  );
};

export default App;
