import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"
import jwt_decode from "jwt-decode";


export const Navbar = () =>{
  const [searchClicked,setSeachClicked]=useState(0);
  const token = localStorage.getItem('token');
  var decoded=false;
  var image =false;
  if(token){
     decoded = jwt_decode(token);
     image =localStorage.getItem('dp')
  } 
  useEffect(()=>{
    console.log('Hi')
  },[localStorage])

  const handleSearchClick = () =>{
       setSeachClicked(1-searchClicked);
  }
/* to handle toggle of dropdown on alternate clicks*/
  const handledropdownClick = () =>{
    var dropdownContent=document.querySelector('.dropbtnn');
      if (dropdownContent.nextSibling.style.display === "block") {
        dropdownContent.nextSibling.style.display = "none";
      } else {
        dropdownContent.nextSibling.style.display = "block";
      }
    };
  
  
 
  return (
  <nav style={{backgroundColor: 'black'}}>
    <div className="nav-wrapper">
      <a href="#" data-target="slide-out" className="sidenav-trigger    show-on-large"><i class="material-icons">menu</i></a>
      <ul id="slide-out" class="sidenav">
        <li>
          <div class="user-view">
          <div class="background">
              <img src="images/yunaa.jpeg"/>{/* need to put user specific img here */}
            </div>
      
            <NavLink to = "/Profile" state = {{username: decoded.username}}>{image ? <img class="circle" src={`data:image/jpeg;base64,${image}`}/>:<img  class="circle" src="images/yuna.jpg"/> }</NavLink>
            {decoded && <NavLink to ="/Profile" state = {{username: decoded.username}}><span class="white-text name">{decoded && decoded.username}</span></NavLink>}
            {decoded && <NavLink to ="/Profile" state = {{username: decoded.username}}><span class="white-text email">{decoded && decoded.email}</span></NavLink>}
          </div>
        </li>
        <li><NavLink to ="/Profile" state = {{username: decoded.username}}>{decoded ? decoded.username : "Hi New user!!"}</NavLink></li>
        <li><NavLink to ="/Postmaker"> Post </NavLink></li>
        <li><NavLink to ="/Explore"> Explore </NavLink></li>
        <li><div class="divider"></div></li>
        <li><NavLink to ="/Setting" class="waves-effect" >Settings</NavLink></li>
        {decoded && <li><NavLink to ="/Logout"> Logout</NavLink></li>}
      </ul>
      <NavLink to='/Home' className="brand-logo"><i className="material-icons">cloud</i>Kitchen</NavLink>
      <ul className="right hide-on-med-and-down">
        <li><i className="material-icons" onClick={handleSearchClick} >search</i></li>
        {searchClicked !==0 && <li><input placeholder="Search"/></li>} {/* to toggle searchbar*/} 
        <li><NavLink to="/About">About Us</NavLink></li>
        <li><NavLink to="/Explore">Explore</NavLink></li>
        <li><NavLink to ="/Postmaker">Postmaker</NavLink></li>  
        { !token && <li><NavLink to ="/Signup">Signup</NavLink></li>}
        {!token && <li><NavLink to="/Login">Login</NavLink></li>}
        { token && <li><NavLink to="/Logout">Logout</NavLink></li>}
        
      </ul>
        <div className="dropdownn">
          <button class="dropbtnn" onClick ={handledropdownClick}>
          <i className="large material-icons drp" >more_vert</i>
          </button>
          <div className="dropdown-contennt">
            <li><NavLink to="/Profile" state = {{username: decoded.username}}>{decoded ? decoded.username : "Hi New user!!"}</NavLink></li>
            <li><NavLink to ="/Setting">Settings</NavLink></li>
            <li><NavLink to ="/Postmaker">Postmaker</NavLink></li>
            { !token && <li><NavLink to ="/Signup">Signup</NavLink></li>}
            {!token && <li><NavLink to="/Login">Login</NavLink></li>}
            { token && <li><NavLink to="/Logout">Logout</NavLink></li>}
            
          </div>

        </div>
      
    </div>
    

    </nav>
      

         
       ) 
  
}