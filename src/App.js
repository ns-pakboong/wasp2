import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import DataDisplay from "./components/DataDisplay";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./components/bootstrap.min.css";
import React, { useContext } from 'react';
import {UserProvider, UserContext } from "./components/js/UserContext";


function App  ()  {
  const currentUser = useContext(UserContext)

  return (

    <BrowserRouter>
      <Routes>
        
            
            <Route path = "/" element =  { <Login/> }></Route>
            <Route path = "/Signup" element = { <Signup></Signup> } ></Route>
            <Route path = "/profile" element = { <Profile></Profile> }></Route>
            <Route path = "/DataDisplay" element = { <DataDisplay></DataDisplay> }></Route>
    
      </Routes>
    </BrowserRouter>
    
    

  );

}

export default App