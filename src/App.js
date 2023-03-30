import 'materialize-css/dist/css/materialize.min.css';;
import M from  'materialize-css/dist/js/materialize.min.js';
import React, { useState, useEffect } from 'react';
import { Routes,Route } from "react-router-dom"
import './App.css';
import './loader.css';
import './fav.css';
import './fav.js';
import './home.css';
import  {Navbar}   from './Components/Navbar.js';
import  {About}   from './Components/About.js';
import  {Login}   from './Components/Login.js';
import  {Setting}   from './Components/Settin.js';
import  {Profile}   from './Components/Profile.js';
import  {Signup}   from './Components/Signup.js';
import  {Home}   from './Components/Home.js';
import  {Postmaker}   from './Components/Postmaker.js';
import  {Post}   from './Components/Post.js';
import  {Logout}   from './Components/Logout';
import  {Forget}   from './Components/forgetpswd';
import  {Reset}   from './Components/reset';
import {disableReactDevTools} from '@fvilers/disable-react-devtools';


if(process.env.NODE_ENV=='PRODUCTION') disableReactDevTools();
function App() {
  useEffect(() => {
    // initializing the sidenav every time the page refreshes
    let sidenav = document.querySelector('#slide-out');
    M.Sidenav.init(sidenav, {});
    
  });
  
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route exact path='/' element ={<Home/>} />
        <Route exact path='/Home' element ={<Home/>} />
        <Route exact path='/Signup' element ={<Signup/>}/>
        <Route exact path='/About' element={<About/>}/>
        <Route exact path='/Login' element={<Login/>}/>
        <Route exact path='/Setting' element={<Setting/>}/>
        <Route exact path='/Profile' element={<Profile/>}/>
        <Route exact path='/Postmaker' element={<Postmaker/>}/>
        <Route exact path='/Explore' element={<Post/>}/>
        <Route exact path='/Logout' element={<Logout/>}/>
        <Route exact path='/forgot-password' element={<Forget/>}/>
        <Route exact path='/reset-password/:token' element={<Reset/>}/>
      </Routes>
    </div>
  );
}

export default App;
   