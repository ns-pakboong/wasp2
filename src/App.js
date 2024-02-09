import Layout from "./Layout";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import DataDisplay from "./components/DataDisplay";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./bootstrap.min.css";
import React, { useContext } from 'react';
import {UserProvider, UserContext } from "./UserContext";


function App  ()  {
  const currentUser = useContext(UserContext)

  return (

    <BrowserRouter>
      <Routes>
        
          <Route path = "/" element = { <Layout></Layout> }>
            <Route index element = { <Login/> }></Route>
            <Route path = "/Signup" element = { <Signup></Signup> } ></Route>
            <Route path = "/profile" element = { <Profile></Profile> }></Route>
            <Route path = "/DataDisplay" element = { <DataDisplay></DataDisplay> }></Route>
          </Route>
        
          
      </Routes>
    </BrowserRouter>
    
    

  );

}

export default App