import React , {createContext, useState} from "react";
import "./App.css";
import Login from "./components/shared components/Login";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./components/shared components/Register";
import Navbar from "./components/shared components/Navbar";
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
    </Routes>
       
  
    </div>
    </commentContext.Provider>
  );
};

export default App;
